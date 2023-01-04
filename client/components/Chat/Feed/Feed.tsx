import { Flex, Grid, Text } from "@chakra-ui/react";
import { ConversationsQuery } from "@client/types";
import { useRouter } from "next/router";
import { MessageInput } from "./Messages/Input";
import { Messages } from "./Messages/Messages";
import MessagesHeader from "./Messages/Header";

interface FeedProps extends ConversationsQuery {
  loading: boolean;
}

export function Feed({ conversations }: FeedProps) {
  const router = useRouter();
  const { conversationId } = router.query;

  const conversation = conversations?.find((conversation) => conversation.id === conversationId);

  return (
    <Flex display={{ base: conversationId ? "flex" : "none", md: "flex" }} width="100%" direction="column">
      {conversationId ? (
        <Flex direction="column" justify="space-between" overflow="hidden" flexGrow={1}>
          <MessagesHeader conversation={conversation} />
          {conversation && <Messages conversationId={conversation.id} />}
          <MessageInput conversationId={conversation?.id} />
        </Flex>
      ) : (
        <Grid height="100%" placeItems="center">
          <Text>No Conversation Selected</Text>
        </Grid>
      )}
    </Flex>
  );
}
