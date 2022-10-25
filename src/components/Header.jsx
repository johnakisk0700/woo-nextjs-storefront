import { Flex, useColorModeValue } from "@chakra-ui/react";
import Nav from "./header/Nav";

const Header = () => {
  const bg = useColorModeValue("white", "black");
  return (
    <Flex
      alignItems="center"
      boxShadow="sm"
      position="sticky"
      height="64px"
      top="0"
      left="0"
      right="0"
      zIndex={"999"}
      bg={bg}
      maxWidth="100vw"
      mb={6}
    >
      <Nav />
    </Flex>
  );
};

export default Header;
