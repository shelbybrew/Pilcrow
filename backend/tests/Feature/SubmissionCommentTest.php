<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Models\InlineComment;
use App\Models\OverallComment;
use App\Models\Publication;
use App\Models\StyleCriteria;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Tests\TestCase;

class SubmissionCommentTest extends TestCase
{
    use MakesGraphQLRequests;
    use RefreshDatabase;

    /**
     * @return Submission
     */
    private function createSubmission()
    {
        $publication = Publication::factory()->create();
        $user = User::factory()->create();

        return Submission::factory()
            ->hasAttached($user, [], 'submitters')
            ->create([
                'publication_id' => $publication->id,
            ]);
    }

    /**
     * @param int $id
     * @return StyleCriteria
     */
    private function createStyleCriteria($id)
    {
        $criteria = StyleCriteria::factory()
        ->create([
            'name' => 'PHPUnit Criteria',
            'publication_id' => $id,
            'description' => 'This is a test style criteria created by PHPUnit',
            'icon' => 'php',
        ]);

        return $criteria;
    }

    /**
     * @param int $count
     * @return Submission
     */
    private function createSubmissionWithInlineComment($count = 1)
    {
        $user = User::factory()->create();
        $submission = $this->createSubmission();
        $style_criteria = $this->createStyleCriteria($submission->publication->id);
        InlineComment::factory()->count($count)->create([
            'submission_id' => $submission->id,
            'content' => 'This is some content for an inline comment created by PHPUnit.',
            'created_by' => $user->id,
            'updated_by' => $user->id,
            'style_criteria' => [$style_criteria->toArray()],
        ]);

        return $submission;
    }

    /**
     * @param int $count
     * @return Submission
     */
    private function createSubmissionWithOverallComment($count = 1)
    {
        $user = User::factory()->create();
        $submission = $this->createSubmission();
        OverallComment::factory()->count($count)->create([
            'submission_id' => $submission->id,
            'content' => 'This is some content for an overall comment created by PHPUnit.',
            'created_by' => $user->id,
            'updated_by' => $user->id,
        ]);

        return $submission;
    }

    public function testInlineCommentsAreNotRetrievedForASubmissionThatHasNone()
    {
        $submission = $this->createSubmission();
        $this->assertEmpty($submission->inlineComments);
    }

    public function testOverallCommentsAreNotRetrievedForASubmissionThatHasNone()
    {
        $submission = $this->createSubmission();
        $this->assertEmpty($submission->overallComments);
    }

    public function testInlineCommentsCanBeRetrievedBySubmission()
    {
        $submission = $this->createSubmissionWithInlineComment();
        $this->assertEquals(1, $submission->inlineComments->count());
    }

    public function testOverallCommentsCanBeRetrievedBySubmission()
    {
        $submission = $this->createSubmissionWithOverallComment();
        $this->assertEquals(1, $submission->overallComments->count());
    }

    public function testInlineCommentsCanBeRetrievedOnTheGraphqlEndpoint()
    {
        $this->beAppAdmin();

        $submission = $this->createSubmissionWithInlineComment(2);
        $response = $this->graphQL(
            'query GetSubmission($id: ID!) {
                submission (id: $id) {
                    id
                    inline_comments {
                        content
                        style_criteria {
                            name
                            icon
                        }
                    }
                }
            }',
            [ 'id' => $submission->id ]
        );
        $expected_data = [
            'submission' => [
                'id' => (string)$submission->id,
                'inline_comments' => [
                    '0' => [
                        'content' => 'This is some content for an inline comment created by PHPUnit.',
                        'style_criteria' => [
                            '0' => [
                                'name' => 'PHPUnit Criteria',
                                'icon' => 'php',
                            ],
                        ],
                    ],
                    '1' => [
                        'content' => 'This is some content for an inline comment created by PHPUnit.',
                        'style_criteria' => [
                            '0' => [
                                'name' => 'PHPUnit Criteria',
                                'icon' => 'php',
                            ],
                        ],
                    ],
                ],
            ],
        ];
        $response->assertJsonPath('data', $expected_data);
    }

    public function testOverallCommentsCanBeRetrievedOnTheGraphqlEndpoint()
    {
        $this->beAppAdmin();

        $submission = $this->createSubmissionWithOverallComment(2);
        $response = $this->graphQL(
            'query GetSubmission($id: ID!) {
                submission (id: $id) {
                    id
                    overall_comments {
                        content
                    }
                }
            }',
            [ 'id' => $submission->id ]
        );
        $expected_data = [
            'submission' => [
                'id' => (string)$submission->id,
                'overall_comments' => [
                    '0' => [
                        'content' => 'This is some content for an overall comment created by PHPUnit.',
                    ],
                    '1' => [
                        'content' => 'This is some content for an overall comment created by PHPUnit.',
                    ],
                ],
            ],
        ];
        $response->assertJsonPath('data', $expected_data);
    }
}