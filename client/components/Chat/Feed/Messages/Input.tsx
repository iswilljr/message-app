import { useMutation } from "@apollo/client";
import { Box, Flex, Input, IconButton } from "@chakra-ui/react";
import { SEND_MESSAGE_MUTATION } from "@client/graphql/mutations";
import { CONVERSATIONS_QUERY, MESSAGES_QUERY } from "@client/graphql/queries";
import { ConversationsQuery, MessagesQuery } from "@client/types";
import { QueryMessagesArgs, SendMessageMutation, SendMessageMutationVariables } from "@client/types/graphql";
import { IconSend } from "@tabler/icons";
import { useState } from "react";
import { useChatContext } from "../../Context";

interface MessageInputProps {
  conversationId?: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const { session } = useChatContext();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMessageMutation] = useMutation<SendMessageMutation, SendMessageMutationVariables>(SEND_MESSAGE_MUTATION);

  const sendMessage: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!conversationId || sending || !message) return;
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
                    id: session.user?.id as string,
                    username: session.user?.username,
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
                id: session.user?.id as string,
                username: session.user?.username,
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
      console.log(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box px={4} py={6} width="100%">
      <form onSubmit={sendMessage}>
        <Flex gap={2}>
          <Input
            placeholder="Write down a message..."
            size="md"
            _focus={{ boxShadow: "none", borderColor: "whiteAlpha.500" }}
            _hover={{ borderColor: "whiteAlpha.400" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            aria-label="Send Message"
            disabled={sending || !message}
            type="submit"
            _focus={{ boxShadow: "none", border: "1px solid", borderColor: "whiteAlpha.500" }}
            // __css={{ "&:hover:not(:disabled)": {  } }}
            _hover={{ "&:not(:disabled)": { border: "1px solid", borderColor: "whiteAlpha.400" } }}
          >
            <IconSend />
          </IconButton>
        </Flex>
      </form>
    </Box>
  );
}
