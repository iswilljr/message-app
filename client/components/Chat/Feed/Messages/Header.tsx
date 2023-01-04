import { useMutation } from "@apollo/client";
import { IconButton, Stack, Text } from "@chakra-ui/react";
import { DELETE_CONVERSATION_MUTATION } from "@client/graphql/mutations";
import { CONVERSATIONS_QUERY } from "@client/graphql/queries";
import { ConversationsQuery } from "@client/types";
import {
  ConversationFragment,
  DeleteConversationMutation,
  DeleteConversationMutationVariables,
} from "@client/types/graphql";
import { formatUsernames } from "@client/utils/format-usernames";
import { IconArrowNarrowLeft, IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";
import { useChatContext } from "../../Context";

interface MessagesHeaderProps {
  conversation?: ConversationFragment;
}

export default function MessagesHeader({ conversation }: MessagesHeaderProps) {
  const router = useRouter();
  const { conversationId } = router.query;
  const { session } = useChatContext();

  const [deleteConversationMutation, { loading }] = useMutation<
    DeleteConversationMutation,
    DeleteConversationMutationVariables
  >(DELETE_CONVERSATION_MUTATION);

  const deleteConversation = async () => {
    if (!conversationId || loading) return;

    try {
      const { data, errors } = await deleteConversationMutation({
        variables: { conversationId: conversationId as string },
        optimisticResponse: { deleteConversation: true },
        update(cache) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.replace("/");
          const cacheData = cache.readQuery<ConversationsQuery>({ query: CONVERSATIONS_QUERY });

          const conversations = [...(cacheData?.conversations ?? [])];

          cache.writeQuery<ConversationsQuery>({
            query: CONVERSATIONS_QUERY,
            data: {
              conversations: conversations.filter((c) => c.id !== conversationId),
            },
          });
        },
      });

      if (!data?.deleteConversation || errors) {
        throw Error(errors?.[0].message ?? "Something went wrong. Please, try again later");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      bg="whiteAlpha.100"
      width="100%"
    >
      <IconButton aria-label="Go back" display={{ base: "flex", md: "none" }} onClick={() => router.replace("/")}>
        <IconArrowNarrowLeft />
      </IconButton>
      <Stack direction="row" justify="space-between" align="center" width="100%" pr={4}>
        <Stack direction="row" align="center">
          <Text color="whiteAlpha.600">To:</Text>
          <Text fontWeight={600}>{formatUsernames(conversation?.participants ?? [], session.user?.id ?? "")}</Text>
        </Stack>
        <IconButton aria-label="Delete conversation" onClick={() => deleteConversation()}>
          <IconTrash />
        </IconButton>
      </Stack>
    </Stack>
  );
}
