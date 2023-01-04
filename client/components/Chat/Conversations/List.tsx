/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useChatContext } from "../Context";
import { ConversationItem } from "./Item";
import { ConversationFragment } from "@client/types/graphql";

export interface ConversationListProps {
  conversations?: ConversationFragment[];
  onViewConversation: (id: string) => Promise<void>;
}

export function ConversationList({ conversations, onViewConversation }: ConversationListProps) {
  const router = useRouter();
  const { session } = useChatContext();
  const { conversationId } = router.query;

  return (
    <Box width="100%" flex={1} overflowY="auto" mb={4}>
      <List overflowY="auto">
        {conversations?.map((conversation) => {
          const participant = conversation.participants.find((participant) => participant.user.id === session.user?.id);

          return (
            <ListItem key={conversation.id}>
              <ConversationItem
                conversation={conversation}
                isSelected={conversation.id === conversationId}
                selectedId={conversationId as string}
                userId={session.user?.id ?? ""}
                hasSeenLatestMessage={participant?.hasSeenLatestMessage}
                onClick={async () => {
                  const conversationId = conversation.id;
                  router.push({ query: { conversationId } });
                  if (participant?.hasSeenLatestMessage) return;
                  await onViewConversation(conversationId);
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
