import { Button, Flex, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { IconCircleMinus } from "@tabler/icons";
import { useMutation } from "@apollo/client";
import { CREATE_CONVERSATION_MUTATION } from "@client/graphql/mutations";
import { useRouter } from "next/router";
import type {
  CreateConversationMutation,
  CreateConversationMutationVariables,
  SearchUser,
} from "@client/types/graphql";

interface SelectedProps {
  closeModal: () => void;
  selectedUsers: SearchUser[];
  removeUser: (userId: string) => void;
}

export function CreateConversation({ closeModal, selectedUsers, removeUser }: SelectedProps) {
  const router = useRouter();

  const [createConversationMutation, { loading }] = useMutation<
    CreateConversationMutation,
    CreateConversationMutationVariables
  >(CREATE_CONVERSATION_MUTATION);

  const createConversation = async () => {
    try {
      const { data, errors } = await createConversationMutation({
        variables: { userIds: selectedUsers.map((user) => user.id) },
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
      {selectedUsers.length > 0 && (
        <Stack spacing={4}>
          <List>
            <Flex gap={10} flexWrap="wrap">
              {selectedUsers.map((user) => (
                <ListItem key={user.id} flexDirection="row" gap="24px">
                  <Stack direction="row" align="center" bg="whiteAlpha.200" borderRadius={4} p={2}>
                    <Text>{user.username}</Text>
                    <button onClick={() => removeUser(user.id)} disabled={loading}>
                      <IconCircleMinus size={20} />
                    </button>
                  </Stack>
                </ListItem>
              ))}
            </Flex>
          </List>
          <Button bg="green.500" _hover={{ bg: "green.600" }} width="100%" mt={6} onClick={() => createConversation()}>
            Create Conversation
          </Button>
        </Stack>
      )}
    </>
  );
}
