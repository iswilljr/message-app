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
  mutation CreateConversation($userIds: [String!]!) {
    createConversation(userIds: $userIds) {
      conversationId
    }
  }
`;
