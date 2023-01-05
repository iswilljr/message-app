import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Avatar, Box, Flex, Stack, Text } from "@mantine/core";
import { useQuery } from "@apollo/client";
import { formatDate } from "@/utils/format-data";
import { MESSAGES_QUERY } from "@/graphql/queries";
import { ON_MESSAGE_SENT } from "@/graphql/subscriptions";
import { SkeletonMessages } from "../Skeleton/Messages";
import type { MessageSubscription, MessagesQuery } from "@/types";
import type { MessagesQueryVariables, OnMessageSentSubscriptionVariables } from "@/types/graphql";

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
  }, [conversationId, session?.user?.id, subscribeToMore]);

  if (loading) return <SkeletonMessages />;

  return (
    <Flex direction="column" justify="flex-end" sx={{ overflow: "hidden", flex: 1 }}>
      <Flex direction="column-reverse" h="100%" pt="md" sx={{ overflowX: "hidden", overflowY: "auto" }}>
        {data?.messages?.map((message) => {
          const isSentByMe = session?.user?.id === message.sender.id;

          return (
            <Stack
              key={message.id}
              py={4}
              px="md"
              spacing={4}
              justify={isSentByMe ? "flex-end" : "flex-start"}
              sx={{ flexDirection: "row", wordBreak: "break-word" }}
            >
              {!isSentByMe && (
                <Flex align="flex-end">
                  <Avatar size="sm" src={message.sender.image} alt={message.sender.username ?? ""} radius="xl" />
                </Flex>
              )}
              <Stack spacing={1} w="100%">
                <Stack sx={{ flexDirection: "row" }} align="center" justify={isSentByMe ? "flex-end" : "flex-start"}>
                  {!isSentByMe && (
                    <Text
                      weight={600}
                      sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
                      color="white.7"
                      align="left"
                      maw="45%"
                      title={message.sender.username ?? undefined}
                    >
                      {message.sender.username}
                    </Text>
                  )}
                  <Text size={14} color="white.8">
                    {formatDate(message.createdAt)}
                  </Text>
                </Stack>
                <Flex justify={isSentByMe ? "flex-end" : "flex-start"}>
                  <Box
                    sx={(theme) => ({ borderRadius: 8 })}
                    bg={isSentByMe ? "green.7" : "white.2"}
                    px={4}
                    py={2}
                    maw="65%"
                  >
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
