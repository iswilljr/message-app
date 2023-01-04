import { useMutation } from "@apollo/client";
import { Avatar, Button, Flex, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { CREATE_CONVERSATION_MUTATION } from "@client/graphql/mutations";
import { CreateConversationMutation, CreateConversationMutationVariables, SearchUser } from "@client/types/graphql";
import { useRouter } from "next/router";

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

  const createConversation = async (userId: string) => {
    try {
      const { data, errors } = await createConversationMutation({
        variables: { userId },
      });

      if (!data?.createConversation) {
        throw Error(errors?.[0].message ?? "Something went wrong. Please, try again later");
      }

      const { conversationId } = data.createConversation;

      await router.push({ query: { conversationId } });

      closeModal();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {users &&
        (users.length > 0 ? (
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>
                <Stack
                  direction="row"
                  align="center"
                  spacing={4}
                  py={2}
                  px={4}
                  borderRadius={4}
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  <Avatar />
                  <Flex justify="space-between" align="center" width="100%">
                    <Text color="whiteAlpha.700">{user.username}</Text>
                    <Button
                      bg={"green.500"}
                      _hover={{ bg: "green.600" }}
                      disabled={loading}
                      onClick={() => createConversation(user.id)}
                    >
                      Create
                    </Button>
                  </Flex>
                </Stack>
              </ListItem>
            ))}
          </List>
        ) : (
          <Flex justify="center">No users found</Flex>
        ))}
    </>
  );
}
