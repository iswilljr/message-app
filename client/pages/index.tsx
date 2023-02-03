/* eslint-disable eqeqeq */
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Flex } from "@mantine/core";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";
import { Conversations } from "@/components/Conversations/Conversations";
import { Feed } from "@/components/Feed";
import { createAuthComponent } from "@/utils/create-auth-component";
import { MARK_CONVERSATION_AS_READ_MUTATION } from "@/graphql/mutations";
import { CONVERSATIONS_QUERY } from "@/graphql/queries";
import { ON_CONVERSATION_UPDATED } from "@/graphql/subscriptions";
import type { ConversationUpdatedSubscription, ConversationsQuery } from "@/types";
import {
  ActionType,
  type MarkConversationAsReadMutation,
  type MarkConversationAsReadMutationVariables,
} from "@/types/graphql";

export function Chat() {
  const router = useRouter();
  const { conversationId } = router.query;
  const { data: session } = useSession();
  const { data, loading, subscribeToMore } = useQuery<ConversationsQuery>(CONVERSATIONS_QUERY);
  const [markConversationAsRead] = useMutation<MarkConversationAsReadMutation, MarkConversationAsReadMutationVariables>(
    MARK_CONVERSATION_AS_READ_MUTATION
  );

  const onViewConversation = useCallback(
    async (conversationId: string) => {
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
              const userParticipantIdx = participants.findIndex((p) => p.user.id === session?.user?.id);
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
        toast.error(error?.message);
      }
    },
    [markConversationAsRead, session?.user?.id]
  );

  useEffect(() => {
    const unsubscribe = subscribeToMore<ConversationUpdatedSubscription>({
      document: ON_CONVERSATION_UPDATED,
      updateQuery: (prev, { subscriptionData }) => {
        const { onConversationUpdated } = subscriptionData.data ?? {};
        if (
          !onConversationUpdated ||
          (onConversationUpdated.actionType !== ActionType.Created &&
            onConversationUpdated.senderId === session?.user?.id)
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

        if (newConversation.id === conversationId) {
          onViewConversation(conversationId).catch((err) => toast.error(err.message));
        }

        return {
          conversations: [newConversation, ...conversations],
        };
      },
    });

    return () => unsubscribe();
  }, [conversationId, subscribeToMore, onViewConversation, router, session?.user?.id]);

  return (
    <Flex sx={{ height: "100vh", overflow: "hidden" }}>
      <Conversations loading={loading} conversations={data?.conversations} onViewConversation={onViewConversation} />
      <Feed loading={loading} conversations={data?.conversations} />
    </Flex>
  );
}

export const getServerSideProps = createAuthComponent({
  redirect: "/login",
  onAuth(ctx, session) {
    if (!session.user?.username) {
      return { redirect: { destination: "/profile", permanent: false } };
    }
    return { props: { session } };
  },
});
