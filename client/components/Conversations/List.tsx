/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, Center, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { ConversationItem } from "./Item";
import { ConversationFragment } from "@client/types/graphql";
import { SkeletonItem } from "../Skeleton/Item";
import { useSession } from "next-auth/react";
import { IconMessagesOff } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";

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
      <Box component="ul" w="100%" sx={{ overflowX: "hidden", overflowY: loading ? "hidden" : "auto", height: "100%" }}>
        {loading ? (
          [...Array(10)].map((_, i) => <SkeletonItem key={i} />)
        ) : conversations?.length ? (
          <AnimatePresence>
            {conversations?.map((conversation, index) => {
              const participant = conversation.participants.find(
                (participant) => participant.user.id === session?.user?.id
              );

              return (
                <motion.li
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
                </motion.li>
              );
            })}
          </AnimatePresence>
        ) : (
          <Center sx={{ gap: 4 }}>
            <Text align="center">No Conversations </Text>
            <IconMessagesOff size={16} />
          </Center>
        )}
      </Box>
    </Box>
  );
}
