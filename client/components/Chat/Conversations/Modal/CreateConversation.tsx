import { Button, Flex, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { IconCircleMinus } from "@tabler/icons";
import type { User } from "@client/types/graphql";

interface SelectedProps {
  selectedUsers: User[];
  removeUser: (userId: string) => void;
}

export function CreateConversation({ selectedUsers, removeUser }: SelectedProps) {
  const createConversation = async () => {};

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
                    <button onClick={() => removeUser(user.id)}>
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
