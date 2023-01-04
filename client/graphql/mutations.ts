import { gql } from "@apollo/client";

export const CREATE_USERNAME_MUTATION = gql`
  mutation CreateUsername($username: String!) {
    createUsername(username: $username) {
      success
      error
    }
  }
`;

export const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($userId: String!) {
    createConversation(userId: $userId) {
      conversationId
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($conversationId: String!, $node: String!) {
    sendMessage(conversationId: $conversationId, node: $node)
  }
`;

export const MARK_CONVERSATION_AS_READ_MUTATION = gql`
  mutation MarkConversationAsRead($conversationId: String!) {
    markConversationAsRead(conversationId: $conversationId)
  }
`;
