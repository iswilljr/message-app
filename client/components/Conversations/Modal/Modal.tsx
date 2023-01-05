import { useState } from "react";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { IconSearch } from "@tabler/icons";
import { SEARCH_USERS_QUERY } from "@/graphql/queries";
import { CreateConversation } from "./CraeteConversation";
import type { SearchUsersQuery, SearchUsersQueryVariables } from "@/types/graphql";

export function ConversationModal({ isOpen, onClose }: { isOpen: boolean; onOpen: () => void; onClose: () => void }) {
  const [username, setUsername] = useState("");

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
      <Modal opened={isOpen} onClose={onClose} title="Create a Conversation">
        <form onSubmit={onSubmit}>
          <Stack spacing="md">
            <TextInput
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button type="submit" leftIcon={<IconSearch size={20} />} disabled={loading || !username} loading={loading}>
              Search
            </Button>
          </Stack>
        </form>
        <Stack mt="md" spacing="md">
          <CreateConversation closeModal={() => onClose()} users={data?.searchUsers} />
        </Stack>
      </Modal>
    </>
  );
}
