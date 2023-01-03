import { GraphQLError } from "graphql";

export const markConversationAsRead: MutationResolvers["markConversationAsRead"] = async (
  _,
  { conversationId },
  { session, prisma, pubsub }
) => {
  if (!session?.user?.id) throw new GraphQLError("Unauthorized");

  try {
    const participant = await prisma.conversationParticipant.findFirstOrThrow({
      where: { conversationId, userId: session.user.id },
    });

    await prisma.conversationParticipant.update({
      where: { id: participant.id },
      data: { hasSeenLatestMessage: true },
    });

    return true;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
