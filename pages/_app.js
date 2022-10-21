import "focus-visible/dist/focus-visible";
import Router from "next/router";
import NProgress from "nprogress";
import Layout from "../src/components/Layout";
import { AppProvider } from "../src/components/context/AppContext";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import client from "../src/components/ApolloClient";
import { theme } from "../src/theme";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </AppProvider>
  );
}

export default MyApp;
