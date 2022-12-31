import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: String!
    username: String!
  }

  type Query {
    searchUsers(id: String!): [User!]
  }

  type Mutation {
    createUsername(username: String!): CreateUsername
  }

  type CreateUsername {
    success: Boolean!
    error: String
  }
`;
