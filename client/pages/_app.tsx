import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { theme } from "@client/utils/theme";
import { client } from "@client/utils/apollo";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import dynamic from "next/dynamic";

const Toaster = dynamic(async () => (await import("react-hot-toast")).Toaster, { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={theme}>
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
