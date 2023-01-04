/* eslint-disable eqeqeq */
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import { Auth } from "@client/components/Auth";
import { Chat } from "@client/components/Chat";
import { UsernameForm } from "@client/components/UsernameForm";
import { ChatProvider } from "@client/components/Context";

interface HomeProps {
  session?: Session | null;
}

export default function Home() {
  const { data, status } = useSession();

  return (
    <Box>
      {status === "authenticated" &&
        (data.user?.username != undefined ? (
          <ChatProvider session={data}>
            <Chat />
          </ChatProvider>
        ) : (
          <UsernameForm />
        ))}
      {status === "unauthenticated" && <Auth />}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (ctx) => {
  const session = await getSession({ ctx });

  return { props: { session } };
};
