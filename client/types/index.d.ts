import type { ConversationFragment } from "./graphql";

export interface ConversationsQuery {
  conversations?: ConversationFragment[];
}

export interface ConversationSubscription {
  onConversationCreated?: ConversationFragment;
}
