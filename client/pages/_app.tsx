import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/utils/apollo";
import { myCache } from "@/utils/cache";
import { theme } from "@/utils/theme";

const Toaster = dynamic(async () => (await import("react-hot-toast")).Toaster, { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Chat with your friends | Me Chat App</title>
        <meta name="description" content="Chat Application to chat with the people you may know" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <MantineProvider emotionCache={myCache} withCSSVariables withGlobalStyles withNormalizeCSS theme={theme}>
        <ApolloProvider client={client}>
          <main>
            <Component {...pageProps} />
            <Toaster
              toastOptions={{ style: { backgroundColor: "var(--mantine-color-white-2)", color: "#fff" } }}
              position="bottom-center"
            />
          </main>
        </ApolloProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
