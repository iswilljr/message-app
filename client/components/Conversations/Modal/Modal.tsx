import { useLazyQuery } from "@apollo/client";
import { Button, Input, Modal, Stack } from "@mantine/core";
import { SEARCH_USERS_QUERY } from "@client/graphql/queries";
import { useState } from "react";
import { CreateConversation } from "./CraeteConversation";
import type { SearchUsersQuery, SearchUsersQueryVariables } from "@client/types/graphql";
import { IconSearch } from "@tabler/icons";

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
            <Input placeholder="Enter a username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
