import { Participants } from "@/types/graphql";

export const formatUsernames = (participants: Participants[], userId: string) => {
  return participants
    .filter((participant) => participant.user.id !== userId)
    .map((participant) => participant.user.username)
    .join(", ");
};
