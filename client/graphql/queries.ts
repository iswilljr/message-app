import { gql } from "@apollo/client";

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($searchUsersId: String!) {
    searchUsers(id: $searchUsersId) {
      id
      username
    }
  }
`;
