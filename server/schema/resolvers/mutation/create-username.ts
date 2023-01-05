export const createUsername: MutationResolvers["createUsername"] = async (_, { username }, { prisma, session }) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) return { success: false, error: "Username is unavailable" };

    await prisma.user.update({ where: { id: session.user.id }, data: { username } });
  } catch (error: any) {
    return { success: false, error: error.message };
  }

  return { success: true };
};
