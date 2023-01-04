/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ConversationItem } from "./Item";
import { ConversationFragment } from "@client/types/graphql";
import { SkeletonItem } from "../Skeleton/Item";
import { useSession } from "next-auth/react";

export interface ConversationListProps {
  conversations?: ConversationFragment[];
  onViewConversation: (id: string) => Promise<void>;
  loading: boolean;
}

export function ConversationList({ conversations, loading, onViewConversation }: ConversationListProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { conversationId } = router.query;

  return (
    <Box width="100%" flex={1} overflowY={loading ? "hidden" : "auto"} mb={4}>
      <List overflowY={loading ? "hidden" : "auto"}>
        {loading
          ? [...Array(10)].map((_, i) => <SkeletonItem key={i} />)
          : conversations?.map((conversation) => {
              const participant = conversation.participants.find(
                (participant) => participant.user.id === session?.user?.id
              );

              return (
                <ListItem key={conversation.id}>
                  <ConversationItem
                    conversation={conversation}
                    isSelected={conversation.id === conversationId}
                    selectedId={conversationId as string}
                    userId={session?.user?.id ?? ""}
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
