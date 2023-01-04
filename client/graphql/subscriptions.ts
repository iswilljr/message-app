import { gql } from "@apollo/client";
import { CONVERSATION_FRAGMENT, MESSAGE_FRAGMENT } from "./fragments";

export const ON_CONVERSATION_UPDATED = gql`
  subscription OnConversationUpdated {
    onConversationUpdated {
      conversation {
        ...CONVERSATION
      }
      senderId
    }
  }

  ${CONVERSATION_FRAGMENT}
`;

export const ON_MESSAGE_SENT = gql`
  subscription OnMessageSent($conversationId: String!) {
    onMessageSent(conversationId: $conversationId) {
      ...MESSAGE
    }
  }

  ${MESSAGE_FRAGMENT}
`;
