/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box, Center, ScrollArea, Text } from "@mantine/core";
import { IconMessagesOff } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { SkeletonItem } from "../Skeleton/Item";
import { ConversationItem } from "./Item";
import type { ConversationFragment } from "@/types/graphql";

export interface ConversationListProps {
  conversations?: ConversationFragment[];
  onViewConversation: (id: string) => Promise<void>;
  loading: boolean;
}

export function ConversationList({ conversations, loading, onViewConversation }: ConversationListProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { conversationId } = router.query;

  const overflowY = loading ? "hidden" : "auto";

  return (
    <Box w="100%" sx={{ flex: 1, overflowY }} mb="md">
      <Box w="100%" sx={{ overflowX: "hidden", overflowY, height: "100%" }}>
        <ScrollArea w="100%" h="100%" px="sm">
          {loading ? (
            [...Array(10)].map((_, i) => <SkeletonItem key={i} />)
          ) : conversations?.length ? (
            <AnimatePresence>
              {conversations?.map((conversation) => {
                const participant = conversation.participants.find(
                  (participant) => participant.user.id === session?.user?.id
                );

                return (
                  <motion.div
                    key={conversation.id}
                    layoutId={conversation.id}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring" }}
                  >
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <Center sx={{ gap: 4 }}>
              <Text align="center">No Conversations </Text>
              <IconMessagesOff size={16} />
            </Center>
          )}
        </ScrollArea>
      </Box>
    </Box>
  );
}
