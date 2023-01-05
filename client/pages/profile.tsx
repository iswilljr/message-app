import { createAuthComponent } from "@client/utils/create-auth-component";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Center, Input, Stack, TextInput } from "@mantine/core";
import { CREATE_USERNAME_MUTATION } from "@client/graphql/mutations";
import { CreateUsernameMutation, CreateUsernameMutationVariables } from "@client/types/graphql";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string>();
  const [createUsername, { loading }] = useMutation<CreateUsernameMutation, CreateUsernameMutationVariables>(
    CREATE_USERNAME_MUTATION
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      if (!username) return setUsernameError("Please, enter your username");
      setUsernameError("");

      const { data, errors } = await createUsername({ variables: { username } });

      if (!data?.createUsername?.success) {
        setUsernameError(
          data?.createUsername?.error ?? errors?.at(0)?.message ?? "Something went wrong. Please, try again later"
        );
      }

      void router.replace("/");
    } catch (error: any) {
      setUsernameError(error.message);
    }
  };

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
            {usernameError && (
              <Input.Error mt="sm" sx={(theme) => ({ color: theme.colors.red[6] })}>
                {usernameError}
              </Input.Error>
            )}
          </Input.Wrapper>
          <Button type="submit" disabled={loading}>
            Create
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export const getServerSideProps = createAuthComponent({
  redirect: "/login",
  onAuth(ctx, session) {
    if (session.user?.username) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return { props: { session } };
  },
});
