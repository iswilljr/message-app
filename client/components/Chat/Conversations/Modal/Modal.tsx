import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { SEARCH_USERS_QUERY } from "@client/graphql/queries";
import { useState } from "react";
import { SearchList } from "./SearchList";
import { CreateConversation } from "./CreateConversation";
import type { SearchUsersQuery, SearchUsersQueryVariables, User } from "@client/types/graphql";

export function ConversationModal({ isOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [searchUsers, { loading, data }] = useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(
    SEARCH_USERS_QUERY
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!username) return;
    await searchUsers({ variables: { searchUsersId: username } });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create a Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Stack spacing={4}>
                <Input placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Button type="submit" disabled={loading || !username} isLoading={loading}>
                  Search
                </Button>
              </Stack>
            </form>
            <Stack mt={6} spacing={4}>
              <SearchList
                users={data?.searchUsers}
                selectedUsers={selectedUsers}
                selectUser={(user) => setSelectedUsers((prev) => [...prev, user])}
              />
              <CreateConversation
                selectedUsers={selectedUsers}
                removeUser={(userId) => setSelectedUsers((prev) => prev.filter((user) => user.id !== userId))}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
