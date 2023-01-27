import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { useMutation } from "@apollo/client";
import { IconSend } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { SEND_MESSAGE_MUTATION } from "@/graphql/mutations";
import { CONVERSATIONS_QUERY, MESSAGES_QUERY } from "@/graphql/queries";
import type { ConversationsQuery, MessagesQuery } from "@/types";
import type { QueryMessagesArgs, SendMessageMutation, SendMessageMutationVariables } from "@/types/graphql";

interface MessageInputProps {
  conversationId: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMessageMutation] = useMutation<SendMessageMutation, SendMessageMutationVariables>(SEND_MESSAGE_MUTATION);

  const sendMessage: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (sending || !message) return;
      setSending(true);

      try {
        setMessage("");

        const { data, errors } = await sendMessageMutation({
          variables: { conversationId, node: message },
          optimisticResponse: { sendMessage: true },
          update(cache) {
            const cacheData = cache.readQuery<MessagesQuery, QueryMessagesArgs>({
              query: MESSAGES_QUERY,
              variables: { conversationId },
            });

            cache.writeQuery<MessagesQuery, QueryMessagesArgs>({
              query: MESSAGES_QUERY,
              variables: { conversationId },
              data: {
                messages: [
                  {
                    __typename: "Message",
                    conversationId,
                    createdAt: new Date().toISOString(),
                    id: `trn-${Math.random()}`,
                    node: message,
                    sender: {
                      __typename: "User",
                      id: session?.user?.id as string,
                      username: session?.user?.username,
                    },
                  },
                  ...(cacheData?.messages ?? []),
                ],
              },
            });

            const cacheConversations = cache.readQuery<ConversationsQuery>({ query: CONVERSATIONS_QUERY });
            const conversations = [...(cacheConversations?.conversations ?? [])];
            const conversationIndex = conversations.findIndex((c) => c.id === conversationId);
            if (conversationIndex === -1) return;
            const conversation = { ...conversations.splice(conversationIndex, 1)[0] };
            conversation.latestMessage &&
              (conversation.latestMessage = {
                ...conversation.latestMessage,
                createdAt: new Date().toISOString(),
                sender: {
                  id: session?.user?.id as string,
                  username: session?.user?.username,
                  __typename: "User",
                },
                node: message,
              });

            cache.writeQuery<ConversationsQuery>({
              query: CONVERSATIONS_QUERY,
              data: { conversations: [conversation, ...conversations] },
            });
          },
        });

        if (!data?.sendMessage || errors) {
          throw Error(errors?.[0].message ?? "Something went wrong. Please, try again later");
        }
      } catch (error: any) {
        toast.error(error?.message);
      } finally {
        setSending(false);
      }
    },
    [conversationId, message, sending, sendMessageMutation, session?.user?.username, session?.user?.id]
  );

  return (
    <Box p="md" w="100%">
      <form onSubmit={sendMessage}>
        <Flex w="100%" justify="space-between" gap={4}>
          <TextInput
            placeholder="Write down a message..."
            size="md"
            sx={{ flex: 1 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ActionIcon
            aria-label="Send Message"
            disabled={sending || !message}
            size="lg"
            h="100%"
            type="submit"
            sx={(theme) => ({
              ":hover": { backgroundColor: theme.colors.white[4] },
              ":disabled": {
                backgroundColor: theme.colors.white[2],
                cursor: "not-allowed",
                color: theme.colors.white[5],
              },
              ":focus": {
                boxShadow: "none",
                border: `1px solid ${theme.colors.white[6]}`,
              },
              "&:hover:not(:disabled)": {
                border: `1px solid ${theme.colors.white[5]}`,
              },
            })}
          >
            <IconSend />
          </ActionIcon>
        </Flex>
      </form>
    </Box>
  );
}
