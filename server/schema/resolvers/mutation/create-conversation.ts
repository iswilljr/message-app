import { GraphQLError } from "graphql";

export const createConversation: MutationResolvers["createConversation"] = async (
  _,
  { userIds },
  { prisma, session }
) => {
  if (!session) throw new GraphQLError("Unauthorized");
  const userId = session.user?.id;

  const participants = userIds.filter((id) => id !== userId);

  if (userId) participants.unshift(userId);

  if (new Set(participants).size !== participants.length) throw new GraphQLError("Invalid userids arguments");

  try {
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          createMany: {
            data: participants.map((id) => ({ userId: id, hasSeenLatestMessage: session.user?.id === id })),
          },
        },
      },
      include: {
        participants: { include: { user: { select: { id: true, username: true } } } },
        latestMessage: { include: { sender: { select: { id: true, username: true } } } },
      },
    });

    return { conversationId: conversation.id };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
