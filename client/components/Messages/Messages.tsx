import { useQuery } from "@apollo/client";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { MESSAGES_QUERY } from "@client/graphql/queries";
import { ON_MESSAGE_SENT } from "@client/graphql/subscriptions";
import { MessagesQuery, MessageSubscription } from "@client/types";
import { MessagesQueryVariables, OnMessageSentSubscriptionVariables } from "@client/types/graphql";
import { formatDate } from "@client/utils/format-data";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { SkeletonMessages } from "../Skeleton/Messages";

interface MessagesProps {
  conversationId: string;
}

export function Messages({ conversationId }: MessagesProps) {
  const { data: session } = useSession();
  const { data, loading, subscribeToMore } = useQuery<MessagesQuery, MessagesQueryVariables>(MESSAGES_QUERY, {
    variables: { conversationId },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore<MessageSubscription, OnMessageSentSubscriptionVariables>({
      document: ON_MESSAGE_SENT,
      variables: { conversationId },
      updateQuery: (prev, { subscriptionData }) => {
        if (
          !subscriptionData.data?.onMessageSent ||
          subscriptionData.data.onMessageSent.sender.id === session?.user?.id
        )
          return prev;
        const newMessage = subscriptionData.data.onMessageSent;

        return {
          messages: [newMessage, ...(prev.messages ?? [])],
        };
      },
    });

    return () => unsubscribe();
  }, [conversationId]);

  if (loading) return <SkeletonMessages />;

  return (
    <Flex direction="column" justify="flex-end" overflow="hidden" flex={1}>
      <Flex direction="column-reverse" height="100%" overflowY="auto">
        {data?.messages?.map((message) => {
          const isSentByMe = session?.user?.id === message.sender.id;

          return (
            <Stack
              key={message.id}
              direction="row"
              py={2}
              px={4}
              spacing={2}
              wordBreak="break-word"
              justify={isSentByMe ? "flex-end" : "flex-start"}
            >
              {!isSentByMe && (
                <Flex align="flex-end">
                  <Avatar size="sm" />
                </Flex>
              )}
              <Stack spacing={1} width="100%">
                <Stack direction="row" align="center" justify={isSentByMe ? "flex-end" : "flex-start"}>
                  {!isSentByMe && (
                    <Text fontWeight={600} textAlign="left">
                      {message.sender.username}
                    </Text>
                  )}
                  <Text fontSize={14} color="whiteAlpha.700">
                    {formatDate(message.createdAt)}
                  </Text>
                </Stack>
                <Flex justify={isSentByMe ? "flex-end" : "flex-start"}>
                  <Box bg={isSentByMe ? "green.600" : "whiteAlpha.100"} px={2} py={1} borderRadius={4} maxWidth="65%">
                    <Text>{message.node}</Text>
                  </Box>
                </Flex>
              </Stack>
            </Stack>
          );
        })}
      </Flex>
    </Flex>
  );
}
