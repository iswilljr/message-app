import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { theme } from "@client/utils/theme";
import { client } from "@client/utils/apollo";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={theme}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
