import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Woocommerce React Theme</title>
      </Head>
      <Header />
      <Container maxW="8xl" minHeight={"100vh"}>
        {props.children}
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
