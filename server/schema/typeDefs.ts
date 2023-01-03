import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type SearchUser {
    id: String!
    username: String
  }

  type User {
    id: String!
    username: String
    email: String
    image: String
  }

  type Conversation {
    id: String!
    participants: [Participants!]!
    latestMessage: Message
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
    sender: User!
    node: String!
    createdAt: Date!
  }

  type Query {
    searchUsers(id: String!): [SearchUser!]
    conversations: [Conversation!]
    messages(conversationId: String!): [Message!]
  }

  type Mutation {
    createUsername(username: String!): CreateUsername
    createConversation(userIds: [String!]!): CreateConversation
    sendMessage(conversationId: String!, node: String!): Boolean
  }

  type Subscription {
    onConversationCreated: Conversation
    onMessageSent(conversationId: String!): Message
  }

  type CreateUsername {
    success: Boolean!
    error: String
  }

  type CreateConversation {
    conversationId: String!
  }
`;
