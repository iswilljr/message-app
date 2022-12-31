import { useState } from "react";
import { Button, Center, FormControl, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [usernameError] = useState<string>();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
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
