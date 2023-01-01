import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Center, FormControl, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react";
import { CREATE_USERNAME_MUTATION } from "@client/graphql/mutations";
import { CreateUsernameMutation, CreateUsernameMutationVariables } from "@client/types/graphql";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<string>();
  const [createUsername] = useMutation<CreateUsernameMutation, CreateUsernameMutationVariables>(
    CREATE_USERNAME_MUTATION
  );

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      if (!username) return setUsernameError("Please, enter your username");
      setUsernameError("");

      const { data, errors } = await createUsername({ variables: { username } });

      if (data?.createUsername?.success) {
        const event = new Event("visibilitychange");
        return document.dispatchEvent(event);
      }

      setUsernameError(
        data?.createUsername?.error ?? errors?.at(0)?.message ?? "Something went wrong. Please, try again later"
      );
    } catch (error: any) {
      setUsernameError(error.message);
    }
  };

  return (
    <Center height="100vh">
      <form onSubmit={onSubmit}>
        <Stack>
          <FormControl>
            <FormLabel htmlFor="username">Enter your username</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <FormHelperText color="red.500">{usernameError}</FormHelperText>}
          </FormControl>
          <Button type="submit">Create</Button>
        </Stack>
      </form>
    </Center>
  );
}
