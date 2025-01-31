import gql from "graphql-tag"
import {
  _COMMENT_FIELDS,
  _CURRENT_USER_FIELDS,
  _PAGINATION_FIELDS,
  _PROFILE_METADATA_FIELDS,
  _RELATED_USER_FIELDS,
} from "./fragments"

export const CURRENT_USER = gql`
  ${_CURRENT_USER_FIELDS}
  query CurrentUser {
    currentUser {
      id
      ...currentUserFields
    }
  }
`

export const CURRENT_USER_METADATA = gql`
  ${_PROFILE_METADATA_FIELDS}
  query CurrentUserMetadata {
    currentUser {
      id
      ...profileMetadata
    }
  }
`

export const CURRENT_USER_NOTIFICATIONS = gql`
  query currentUserNotifications($page: Int, $unread: Boolean, $read: Boolean) {
    currentUser {
      id
      notifications(first: 10, page: $page, unread: $unread, read: $read) {
        paginatorInfo {
          ...paginationFields
        }
        data {
          id
          read_at
          created_at
          data {
            user {
              username
            }
            submission {
              title
            }
            invitee {
              display_label
            }
            inviter {
              display_label
            }
            publication {
              name
            }
            type
            body
          }
        }
      }
    }
  }
  ${_PAGINATION_FIELDS}
`
export const CURRENT_USER_SUBMISSIONS = gql`
  query CurrentUserSubmission {
    currentUser {
      id
      roles {
        name
      }
      submissions {
        id
        title
        status
        my_role
        effective_role
        inline_comments {
          id
          content
          created_by {
            id
            display_label
            email
          }
          updated_by{
            id
            display_label
            email
          }
          created_at
          updated_at
          style_criteria {
            id
            name
            icon
          }
          replies {
            id
            content
            created_by {
              id
              display_label
              email
            }
            updated_by{
              id
              display_label
              email
            }
            created_at
            updated_at
          }
        }
        overall_comments {
          id
          content
          created_by{
            id
            display_label
            email
          }
          updated_by{
            id
            display_label
            email
          }
          created_at
          updated_at
          replies {
            id
            content
            created_by {
              id
              display_label
              email
            }
            updated_by{
              id
              display_label
              email
            }
            created_at
            updated_at
          }
        }
        publication {
          id
          name
          my_role
        }
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers($page: Int) {
    userSearch(page: $page) {
      paginatorInfo {
        ...paginationFields
      }
      data {
        id
        name
        username
        email
      }
    }
  }
  ${_PAGINATION_FIELDS}
`

export const GET_USER = gql`
  query getUser($id: ID) {
    user(id: $id) {
      username
      email
      name
      roles {
        name
      }
    }
  }
`

export const SEARCH_USERS = gql`
  query SearchUsers($term: String, $page: Int) {
    userSearch(term: $term, page: $page) {
      paginatorInfo {
        ...paginationFields
      }
      data {
        id
        username
        name
        email
      }
    }
  }
  ${_PAGINATION_FIELDS}
`

export const GET_PUBLICATIONS = gql`
  query GetPublications($page: Int) {
    publications(page: $page) {
      paginatorInfo {
        ...paginationFields
      }
      data {
        id
        name
        home_page_content
      }
    }
  }
  ${_PAGINATION_FIELDS}
`

export const GET_SUBMISSION = gql`
  query GetSubmission($id: ID!) {
    submission(id: $id) {
      id
      title
      status
      effective_role
      audits {
        id
        event
        user {
          id
          name
          username
          email
        }
        old_values {
          title
          status
          status_change_comment
        }
        new_values {
          title
          status
          status_change_comment
        }
        created_at
      }
      publication {
        id
        name
        style_criterias {
          id
          name
          description
          icon
        }
      }
      reviewers {
        ...relatedUserFields
      }
      review_coordinators {
        ...relatedUserFields
      }
      submitters {
        ...relatedUserFields
      }
    }
  }
  ${_RELATED_USER_FIELDS}
`

export const GET_SUBMISSION_REVIEW = gql`
  query GetSubmissionReview($id: ID!) {
    submission(id: $id) {
      id
      title
      status
      content {
        data
      }
      publication {
        id
        style_criterias {
          id
          name
          description
          icon
        }
      }
      inline_comments {
        from
        to
        ...commentFields
        style_criteria {
          id
          name
          icon
        }
        replies {
          ...commentFields
          reply_to_id
        }
      }
      overall_comments {
        ...commentFields
        replies {
          ...commentFields
          reply_to_id
        }
      }
    }
  }
  ${_COMMENT_FIELDS}
`

export const GET_PUBLICATION = gql`
  query GetPublication($id: ID!) {
    publication(id: $id) {
      id
      name
      is_publicly_visible
      is_accepting_submissions
      effective_role
      home_page_content
      new_submission_content
      style_criterias {
        name
        id
        icon
        description
      }
      publication_admins {
        ...relatedUserFields
      }
      editors {
        ...relatedUserFields
      }
    }
  }
  ${_RELATED_USER_FIELDS}
`
