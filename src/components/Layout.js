import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";

const Layout = (props) => {
  const bg = useColorModeValue("blackAlpha.200", "gray.800");
  return (
    <>
      <Head>
        <title>Woocommerce React Theme</title>
      </Head>
      <Box bg={bg}>
        <Header />
        <Container maxW="8xl" minHeight={"100vh"}>
          {props.children}
        </Container>
      </Box>

      <Footer />
    </>
  );
};

export default Layout;
