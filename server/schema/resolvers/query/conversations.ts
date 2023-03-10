import { Prisma } from "@prisma/client";

export const conversations: QueryResolvers["conversations"] = async (_, _args, { prisma, session }) => {
  const conversations = await prisma.conversation.findMany({
    where: { participants: { some: { userId: { equals: session.user.id } } } },
    include: populateConversation,
    orderBy: { updatedAt: "desc" },
  });

  return conversations;
};

const populateUser = Prisma.validator<Prisma.UserArgs>()({
  select: { id: true, email: true, image: true, username: true },
});

const populateParticipants = Prisma.validator<Prisma.ConversationParticipantArgs>()({
  select: { id: true, hasSeenLatestMessage: true, user: populateUser },
});

const populateLastMessages = Prisma.validator<Prisma.MessageArgs>()({
  select: { id: true, conversationId: true, sender: populateUser, node: true, createdAt: true },
});

export const populateConversation = Prisma.validator<Prisma.ConversationInclude>()({
  participants: populateParticipants,
  latestMessage: populateLastMessages,
});
