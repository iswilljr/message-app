import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Button, Center, Input, Stack, TextInput } from "@mantine/core";
import { useMutation } from "@apollo/client";
import { IconUserPlus } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { createAuthComponent } from "@/utils/create-auth-component";
import { CREATE_USERNAME_MUTATION } from "@/graphql/mutations";
import type { CreateUsernameMutation, CreateUsernameMutationVariables } from "@/types/graphql";

export default function Profile() {
  const router = useRouter();
  const [created, setCreated] = useState(false);
  const [username, setUsername] = useState("");
  const [createUsername, { loading }] = useMutation<CreateUsernameMutation, CreateUsernameMutationVariables>(
    CREATE_USERNAME_MUTATION
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username) return toast("Please, enter your username");
      if (created) return;

      try {
        const { data, errors } = await createUsername({ variables: { username } });
        if (!data?.createUsername?.success) {
          throw Error(
            data?.createUsername?.error ?? errors?.at(0)?.message ?? "Something went wrong. Please, try again later"
          );
        }

        setCreated(true);
        setUsername("");
        toast.success("Username created");

        void router.replace("/");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [createUsername, created, username, router]
  );

  return (
    <Center sx={{ height: "100vh" }}>
      <form onSubmit={onSubmit}>
        <Stack>
          <Input.Wrapper>
            <Input.Label htmlFor="username">Enter your username</Input.Label>
            <TextInput
              id="username"
              mt="sm"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Input.Wrapper>
          <Button
            type="submit"
            rightIcon={<IconUserPlus size={18} />}
            loaderPosition="right"
            loading={loading}
            disabled={created || loading || !username}
          >
            Create
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export const getServerSideProps = createAuthComponent({ redirect: "/login" });
