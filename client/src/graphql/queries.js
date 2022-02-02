import gql from "graphql-tag"
import { _CURRENT_USER_FIELDS, _PROFILE_METADATA_FIELDS } from "./fragments"

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
  query currentUserNotifications($page: Int) {
    currentUser {
      id
      notifications(first: 10, page: $page) {
        paginatorInfo {
          count
          currentPage
          lastPage
          perPage
        }
        data {
          id
          read_at
          data {
            user {
              username
            }
            submission {
              title
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
`
export const CURRENT_USER_SUBMISSIONS = gql`
  query CurrentUserSubmission {
    currentUser {
      id
      submissions {
        id
        pivot {
          id
          role_id
        }
      }
    }
  }
`

export const GET_USERS = gql`
  query GetUsers($page: Int) {
    userSearch(page: $page) {
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
      }
      data {
        id
        name
        username
        email
      }
    }
  }
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
        count
        currentPage
        lastPage
        perPage
      }
      data {
        id
        username
        name
        email
      }
    }
  }
`

export const GET_PUBLICATIONS = gql`
  query GetPublications($page: Int) {
    publications(page: $page) {
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
      }
      data {
        id
        name
      }
    }
  }
`

export const GET_SUBMISSIONS = gql`
  query GetSubmissions($page: Int) {
    submissions(page: $page) {
      paginatorInfo {
        count
        currentPage
        lastPage
        perPage
      }
      data {
        id
        title
        publication {
          name
        }
        files {
          id
          file_upload
        }
      }
    }
  }
`

export const GET_SUBMISSION = gql`
  query GetSubmission($id: ID!) {
    submission(id: $id) {
      title
      publication {
        name
      }
      users {
        name
        username
        email
        pivot {
          id
          user_id
          role_id
        }
      }
    }
  }
`

export const GET_PUBLICATION = gql`
  query GetPublication($id: ID!) {
    publication(id: $id) {
      name
      is_publicly_visible
      users {
        name
        email
        username
        pivot {
          id
          user_id
          role_id
        }
      }
    }
  }
`
