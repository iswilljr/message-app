import { GraphQLError } from "graphql";

export const searchUsers: QueryResolvers["searchUsers"] = async (_, { id }, { prisma, session }) => {
  if (!session) throw new GraphQLError("Unauthorized");

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: id,
          not: session.user?.username,
          mode: "insensitive",
        },
      },
    });

    return users.map((user) => ({ id: user.id, username: user.username as string }));
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
