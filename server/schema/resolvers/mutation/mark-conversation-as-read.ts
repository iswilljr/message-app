export const markConversationAsRead: MutationResolvers["markConversationAsRead"] = async (
  _,
  { conversationId },
  { session, prisma, pubsub }
) => {
  const participant = await prisma.conversationParticipant.findFirstOrThrow({
    where: { conversationId, userId: session.user.id },
  });

  await prisma.conversationParticipant.update({
    where: { id: participant.id },
    data: { hasSeenLatestMessage: true },
  });

  return true;
};
