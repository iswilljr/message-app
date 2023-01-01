import { createUsername } from "./mutation/create-username.js";

export const resolvers: Resolvers = {
  Query: {
    searchUsers: () => [],
  },
  Mutation: {
    createUsername,
  },
};
