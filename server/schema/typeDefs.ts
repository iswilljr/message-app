import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type SearchUser {
    id: String!
    username: String
  }

  type User {
    id: String!
    email: String
    image: String
    username: String
  }

  type Conversation {
    id: String!
    latestMessage: Message
    participants: [Participants!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Participants {
    id: String!
    user: User!
    hasSeenLatestMessage: Boolean!
  }

  type Message {
    id: String!
    conversationId: String!
    node: String!
    sender: User!
    createdAt: Date!
  }

  type Query {
    conversations: [Conversation!]
    messages(conversationId: String!): [Message!]
    searchUsers(id: String!): [SearchUser!]
  }

  type Mutation {
    createConversation(userIds: [String!]!): CreateConversation
    createUsername(username: String!): CreateUsername
    deleteConversation(conversationId: String!): Boolean
    markConversationAsRead(conversationId: String!): Boolean
    sendMessage(conversationId: String!, node: String!): Boolean
  }

  type Subscription {
    onConversationUpdated: onConversationUpdatedPayload
    onMessageSent(conversationId: String!): Message
  }

  type onConversationUpdatedPayload {
    actionType: ActionType!
    conversation: Conversation!
    senderId: String!
  }

  enum ActionType {
    Created
    Deleted
    Updated
  }

  type CreateUsername {
    success: Boolean!
    error: String
  }

  type CreateConversation {
    conversationId: String!
  }
`;
