import { createConversation } from "./mutation/create-conversation.js";
import { createUsername } from "./mutation/create-username.js";
import { conversations } from "./query/conversations.js";
import { searchUsers } from "./query/search-users.js";
import { onConversationCreated } from "./subscriptions/on-conversation-created.js";

export const resolvers: Resolvers = {
  Query: {
    searchUsers,
    conversations,
  },
  Mutation: {
    createUsername,
    createConversation,
  },
  Subscription: {
    onConversationCreated,
  },
};
