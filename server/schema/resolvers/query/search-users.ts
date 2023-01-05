import { Prisma } from "@prisma/client";

export const searchUsers: QueryResolvers["searchUsers"] = async (_, { id }, { prisma, session }) => {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: id,
        not: session.user.username,
        mode: "insensitive",
      },
    },
    select: populateUser,
  });

  return users;
};

const populateUser = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  username: true,
  image: true,
});
