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
    latestMessage {
      id
      sender {
        id
        username
      }
      node
      createdAt
    }
    createdAt
    updatedAt
  }
`;

export const MESSAGE_FRAGMENT = gql`
  fragment MESSAGE on Message {
    id
    conversationId
    node
    sender {
      id
      username
    }
    createdAt
  }
`;
