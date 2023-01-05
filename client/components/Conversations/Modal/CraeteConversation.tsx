import { useMutation } from "@apollo/client";
import { Avatar, Flex, List, Stack, Text, ActionIcon } from "@mantine/core";
import { CREATE_CONVERSATION_MUTATION } from "@client/graphql/mutations";
import { CreateConversationMutation, CreateConversationMutationVariables, SearchUser } from "@client/types/graphql";
import { IconMessagePlus } from "@tabler/icons";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useCallback } from "react";

interface SearchListProps {
  users?: SearchUser[] | null;
  closeModal: () => void;
}

export function CreateConversation({ users, closeModal }: SearchListProps) {
  const router = useRouter();

  const [createConversationMutation, { loading }] = useMutation<
    CreateConversationMutation,
    CreateConversationMutationVariables
  >(CREATE_CONVERSATION_MUTATION);

  const createConversation = useCallback(
    async (userId: string) => {
      try {
        const { data, errors } = await createConversationMutation({
          variables: { userId },
        });

        if (!data?.createConversation) {
          throw Error(errors?.[0].message ?? "Something went wrong. Please, try again later");
        }

        toast.success("Conversation created");

        const { conversationId } = data.createConversation;

        void router.push({ query: { conversationId } });

        closeModal();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [closeModal, createConversationMutation, router]
  );

  return (
    <>
      {users &&
        (users.length > 0 ? (
          <List>
            {users.map((user) => (
              <List.Item key={user.id}>
                <Stack
                  w="100%"
                  align="center"
                  spacing="xs"
                  px="xs"
                  py={4}
                  sx={(theme) => ({
                    borderRadius: theme.radius.md,
                    flexDirection: "row",
                    ":hover": { backgroundColor: theme.colors.white[2] },
                  })}
                >
                  <Avatar size={50} src={user.image} alt={user?.username ?? ""} radius="xl" />
                  <Flex justify="space-between" align="center" sx={{ flex: 1 }}>
                    <Text color="white.8" sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                      {user.username}
                    </Text>
                    <ActionIcon
                      aria-label="Create new chat"
                      title="Create new chat"
                      bg="green.6"
                      sx={(theme) => ({ ":hover": { backgroundColor: theme.colors.green[7] } })}
                      disabled={loading}
                      onClick={() => createConversation(user.id)}
                    >
                      <IconMessagePlus />
                    </ActionIcon>
                  </Flex>
                </Stack>
              </List.Item>
            ))}
          </List>
        ) : (
          <Flex justify="center">No users found</Flex>
        ))}
    </>
  );
}
