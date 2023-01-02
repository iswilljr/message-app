import { gql } from "@apollo/client";
import { CONVERSATION_FRAGMENT } from "./fragments";

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($searchUsersId: String!) {
    searchUsers(id: $searchUsersId) {
      id
      username
    }
  }
`;

export const CONVERSATIONS_QUERY = gql`
  query Conversations {
    conversations {
      ...CONVERSATION
    }
  }

  ${CONVERSATION_FRAGMENT}
`;
