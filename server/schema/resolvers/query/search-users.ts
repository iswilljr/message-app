import { Prisma } from "@prisma/client";
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
      select: populateUser,
    });

    return users;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const populateUser = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
});
