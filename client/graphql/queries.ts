import { gql } from "@apollo/client";
import { CONVERSATION_FRAGMENT, MESSAGE_FRAGMENT } from "./fragments";

export const SEARCH_USERS_QUERY = gql`
  query SearchUsers($searchUsersId: String!) {
    searchUsers(id: $searchUsersId) {
      id
      username
      image
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

export const MESSAGES_QUERY = gql`
  query Messages($conversationId: String!) {
    messages(conversationId: $conversationId) {
      ...MESSAGE
    }
  }

  ${MESSAGE_FRAGMENT}
`;
