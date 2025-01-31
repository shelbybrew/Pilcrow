<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Submission;
use App\Models\SubmissionContent;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubmissionSeeder extends Seeder
{
    /**
     * Seed a submission with the following roles:
     * - Submitter: regularUser
     * - Review Coordinator: reviewCoordinator
     *
     * @return void
     */
    public function run()
    {
        $this->callOnce(PublicationSeeder::class);
        $this->callOnce(UserSeeder::class);

        $this->createSubmission(100, 'Pilcrow Test Submission 1')
            ->update(['updated_by' => 1, 'status' => Submission::UNDER_REVIEW]);

        $this->createSubmission(101, 'Pilcrow Test Submission 2')
            ->update(['updated_by' => 6, 'status' => Submission::INITIALLY_SUBMITTED]);

        $this->createSubmission(102, 'Pilcrow Test Submission 3')
            ->update(['updated_by' => 3, 'status' => Submission::REJECTED]);

        $this->createSubmission(103, 'Pilcrow Test Submission 4')
            ->update(['updated_by' => 3, 'status' => Submission::RESUBMISSION_REQUESTED]);

        $this->createSubmission(104, 'Pilcrow Test Submission 5'); // DRAFT

        $this->createSubmission(105, 'Pilcrow Test Submission 6')
            ->update(['updated_by' => 3, 'status' => Submission::ACCEPTED_AS_FINAL]);

        $this->createSubmission(106, 'Pilcrow Test Submission 7')
            ->update(['updated_by' => 3, 'status' => Submission::EXPIRED]);

        $this->createSubmission(107, 'Pilcrow Test Submission 8')
            ->update(['updated_by' => 3, 'status' => Submission::AWAITING_DECISION]);

        $this->createSubmission(108, 'Pilcrow Test Submission 9')
            ->update(['updated_by' => 3, 'status' => Submission::AWAITING_REVIEW]);

        $this->createSubmission(109, 'Pilcrow Test Submission 10')
            ->update(['updated_by' => 1, 'status' => Submission::ARCHIVED]);

        $this->createSubmission(110, 'Pilcrow Test Submission 11')
            ->update(['updated_by' => 1, 'status' => Submission::DELETED]);
    }

    /**
     * Create a submission
     *
     * @param int $id
     * @param string $title
     * @param array $data
     * @return \Database\Seeders\App\Models\Submission
     */
    protected function createSubmission(int $id, string $title, array $data = []): Submission
    {
        $dataWithDefaults = [
            'id' => $id,
            'title' => $title,
            'publication_id' => 1,
            'created_by' => 6,
            'updated_by' => 6,
            'status' => Submission::DRAFT,
            ...$data,
        ];

        $submission = Submission::factory()
            ->hasAttached(
                User::firstWhere('username', 'regularUser'),
                [],
                'submitters'
            )
            ->hasAttached(
                User::firstWhere('username', 'reviewCoordinator'),
                [],
                'reviewCoordinators'
            )
            ->hasAttached(
                User::firstWhere('username', 'reviewer'),
                [],
                'reviewers'
            )
            ->has(SubmissionContent::factory()->count(3), 'contentHistory')
            ->create($dataWithDefaults);
        $submission->updated_by = 2;
        $submission->content()->associate($submission->contentHistory->last())->save();

        return $submission;
    }
}
