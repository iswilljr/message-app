import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";

export const messages: QueryResolvers["messages"] = async (_, { conversationId }, { session, prisma }) => {
  if (!session?.user?.id) throw new GraphQLError("Unauthorized");

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        conversation: { participants: { some: { userId: { equals: session.user.id } } } },
      },
      include: populateMessage,
      orderBy: { createdAt: "desc" },
    });

    return messages;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export const populateMessage = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      username: true,
    },
  },
});
