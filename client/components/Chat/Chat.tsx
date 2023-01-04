import { useMutation, useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { MARK_CONVERSATION_AS_READ_MUTATION } from "@client/graphql/mutations";
import { CONVERSATIONS_QUERY } from "@client/graphql/queries";
import { ON_CONVERSATION_UPDATED } from "@client/graphql/subscriptions";
import { ConversationsQuery, ConversationUpdatedSubscription } from "@client/types";
import {
  ActionType,
  MarkConversationAsReadMutation,
  MarkConversationAsReadMutationVariables,
} from "@client/types/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useChatContext } from "./Context";
import { Conversations } from "./Conversations/Conversations";
import { Feed } from "./Feed/Feed";

export function Chat() {
  const router = useRouter();
  const { conversationId } = router.query;
  const { session } = useChatContext();
  const { data, subscribeToMore } = useQuery<ConversationsQuery>(CONVERSATIONS_QUERY);
  const [markConversationAsRead] = useMutation<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>(
    MARK_CONVERSATION_AS_READ_MUTATION
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore<ConversationUpdatedSubscription>({
      document: ON_CONVERSATION_UPDATED,
      updateQuery: (prev, { subscriptionData }) => {
        const { onConversationUpdated } = subscriptionData.data ?? {};
        if (
          !onConversationUpdated ||
          (onConversationUpdated.actionType !== ActionType.Created &&
            onConversationUpdated.senderId === session.user?.id)
        )
          return prev;

        const { conversation: newConversation, actionType } = onConversationUpdated;

        const conversations = [...(prev.conversations ?? [])].filter(
          (conversation) => conversation.id !== newConversation.id
        );

        if (actionType === ActionType.Deleted) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.replace("/");
          return { conversations };
        }
        if (actionType === ActionType.Created) {
          return {
            conversations: [newConversation, ...(prev.conversations ?? [])],
          };
        }

        if (newConversation.id === conversationId) onViewConversation(conversationId).catch(console.log);

        return {
          conversations: [newConversation, ...conversations],
        };
      },
    });

    return () => unsubscribe();
  }, [conversationId]);

  const onViewConversation = async (conversationId: string) => {
    try {
      await markConversationAsRead({
        variables: { conversationId },
        optimisticResponse: { markConversationAsRead: true },
        update: (cache) => {
          const cacheConversations = cache.readQuery<ConversationsQuery>({
            query: CONVERSATIONS_QUERY,
          });

          if (!cacheConversations) return;

          const newData = (cacheConversations?.conversations ?? []).map((cacheConversation) => {
            if (cacheConversation.id !== conversationId) return cacheConversation;
            const participants = [...cacheConversation.participants];
            const userParticipantIdx = participants.findIndex((p) => p.user.id === session.user?.id);
            if (userParticipantIdx === -1) return cacheConversation;
            const userParticipant = participants[userParticipantIdx];
            participants[userParticipantIdx] = {
              ...userParticipant,
              hasSeenLatestMessage: true,
            };
            return {
              ...cacheConversation,
              participants,
            };
          });

          cache.writeQuery<ConversationsQuery>({
            query: CONVERSATIONS_QUERY,
            data: { conversations: newData },
          });
        },
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Flex height="100vh">
      <Conversations conversations={data?.conversations} onViewConversation={onViewConversation} />
      <Feed conversations={data?.conversations} />
    </Flex>
  );
}
