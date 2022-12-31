import { CreateUsernameData, MyContext } from "../types/index.js";

export const resolvers = {
  Query: {
    searchUsers: () => [],
  },
  Mutation: {
    createUsername: async (
      _: any,
      { username }: { username: string },
      { prisma, session }: MyContext
    ): Promise<CreateUsernameData> => {
      if (!session) return { success: false, error: "Unauthorized" };

      try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (user) return { success: false, error: "Username is unavailable" };

        await prisma.user.update({ where: { id: session.user.id }, data: { username } });
      } catch (error: any) {
        return { success: false, error: error.message };
      }

      return { success: true };
    },
  },
};
