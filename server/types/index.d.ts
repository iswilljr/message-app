import {
  Resolvers as GraphQLResolvers,
  QueryResolvers as GraphQLQueryResolvers,
  MutationResolvers as GraphQLMutationResolvers,
} from "./graphql.js";
import type { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

declare global {
  interface Context {
    session?: Session | null;
    prisma: PrismaClient;
  }

  interface Resolvers extends GraphQLResolvers<Context> {}

  interface QueryResolvers extends GraphQLQueryResolvers<Context> {}

  interface MutationResolvers extends GraphQLMutationResolvers<Context> {}
}

export {};
