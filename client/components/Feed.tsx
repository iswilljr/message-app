import { Box, Flex } from "@mantine/core";
import { ConversationsQuery } from "@/types";
import { useRouter } from "next/router";
import { MessageInput } from "./Messages/Input";
import { Messages } from "./Messages/Messages";
import { MessagesHeader } from "./Messages/Header";
import { SkeletonFeed } from "./Skeleton/Feed";
import NoConversation from "./NoConversation";

interface FeedProps extends ConversationsQuery {
  loading: boolean;
}

export function Feed({ conversations, loading }: FeedProps) {
  const router = useRouter();
  const { conversationId } = router.query;

  const conversation = conversations?.find((conversation) => conversation.id === conversationId);

  return (
    <Box
      display={{ base: conversationId ? "flex" : "none", sm: "flex" }}
      w={{ base: "100%", sm: "calc(100% - 400px)" }}
    >
      {conversationId &&
        (loading ? (
          <SkeletonFeed />
        ) : (
          conversation && (
            <Flex direction="column" justify="space-between" sx={{ overflow: "hidden", flexGrow: 1 }}>
              <MessagesHeader conversation={conversation} />
              <Messages conversationId={conversation.id} />
              <MessageInput conversationId={conversation?.id} />
            </Flex>
          )
        ))}
      {(!conversationId || (!loading && !conversation)) && (
        <NoConversation loading={loading} hasConversations={Boolean(!loading && conversations?.length)} />
      )}
    </Box>
  );
}
