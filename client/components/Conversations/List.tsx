/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, Center, List, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { ConversationItem } from "./Item";
import { ConversationFragment } from "@client/types/graphql";
import { SkeletonItem } from "../Skeleton/Item";
import { useSession } from "next-auth/react";
import { IconMessagesOff } from "@tabler/icons";

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
    <Box w="100%" sx={{ flex: 1, overflowY: loading ? "hidden" : "auto" }} mb="md">
      <List sx={{ overflowY: loading ? "hidden" : "auto" }}>
        {loading ? (
          [...Array(10)].map((_, i) => <SkeletonItem key={i} />)
        ) : conversations?.length ? (
          conversations?.map((conversation) => {
            const participant = conversation.participants.find(
              (participant) => participant.user.id === session?.user?.id
            );

            return (
              <List.Item key={conversation.id}>
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
              </List.Item>
            );
          })
        ) : (
          <Center sx={{ gap: 4 }}>
            <Text align="center">No Conversations </Text>
            <IconMessagesOff size={16} />
          </Center>
        )}
      </List>
    </Box>
  );
}
