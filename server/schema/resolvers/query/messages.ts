import { Prisma } from "@prisma/client";

export const messages: QueryResolvers["messages"] = async (_, { conversationId }, { session, prisma }) => {
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
      conversation: { participants: { some: { userId: { equals: session.user.id } } } },
    },
    include: populateMessage,
    orderBy: { createdAt: "desc" },
  });

  return messages;
};

export const populateMessage = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});
