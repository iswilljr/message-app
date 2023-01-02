import { gql } from "@apollo/client";

export const CONVERSATION_FRAGMENT = gql`
  fragment CONVERSATION on Conversation {
    id
    participants {
      hasSeenLatestMessage
      id
      user {
        id
        username
      }
    }
    createdAt
    updatedAt
  }
`;

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
