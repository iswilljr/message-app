import { GraphQLError } from "graphql";
import type { Resolver } from "../types/graphql.js";
import { logger } from "./logger.js";

export const resolverWrapper = <Result, Parent, Args>(
  resolver: Resolver<Result, Parent, Context, Args>
): Resolver<Result, Parent, UnsafeContext, Args> => {
  return async (parent, args, unsafeContext, graphQLResolveInfo) => {
    const resolverFn = typeof resolver === "function" ? resolver : resolver.resolve;

    try {
      if (!unsafeContext.session?.user?.id) throw new GraphQLError("Unauthorized");

      const result = await resolverFn(parent, args, unsafeContext as Context, graphQLResolveInfo);

      return result;
    } catch (error: any) {
      const message: string = error.message ?? "Something went wrong. Please, try again later";

      logger.error(`[${resolverFn.name.toUpperCase()}]`, message);
      throw new GraphQLError(message);
    }
  };
};
