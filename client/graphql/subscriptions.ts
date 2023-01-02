import { gql } from "@apollo/client";
import { CONVERSATION_FRAGMENT } from "./fragments";

export const ON_CONVERSATION_CREATED = gql`
  subscription OnConversationCreated {
    onConversationCreated {
      ...CONVERSATION
    }
  }

  ${CONVERSATION_FRAGMENT}
`;
