import { Avatar, Button, Flex, List, ListItem, Stack, Text } from "@chakra-ui/react";
import { User } from "@client/types/graphql";

interface SearchListProps {
  users?: User[] | null;
  selectedUsers: User[];
  selectUser: (user: User) => void;
}

export function SearchList({ users, selectedUsers, selectUser }: SearchListProps) {
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
                      disabled={selectedUsers.includes(user)}
                      onClick={() => selectUser(user)}
                    >
                      Add
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
