import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";

const Layout = (props) => {
  const bg = useColorModeValue("blackAlpha.200", "gray.800");
  return (
    <>
      <Head>
        <title>Woocommerce React Theme</title>
      </Head>
      <Box bg={bg}>
        <Header />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          minHeight="calc(100vh - 88px)"
        >
          <Container maxW="8xl">{props.children}</Container>
          <Footer />
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
