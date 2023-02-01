/* eslint-disable eqeqeq */
import { ApolloProvider } from "@apollo/client";
import { Chat } from "@/components/Chat";
import { client } from "@/utils/apollo";
import { createAuthComponent } from "@/utils/create-auth-component";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}

export const getServerSideProps = createAuthComponent({
  redirect: "/login",
  onAuth(ctx, session) {
    if (!session.user?.username) {
      return { redirect: { destination: "/profile", permanent: false } };
    }
    return { props: { session } };
  },
});
