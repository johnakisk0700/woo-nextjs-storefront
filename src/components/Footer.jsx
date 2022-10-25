import { PhoneIcon } from "@chakra-ui/icons";
import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import Logo from "./header/Logo";

const Footer = () => {
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box as="footer" bg={bg} width="100%" height="128px" mt={12} py={4}>
      <Container maxW="8xl">
        <Logo />
        <Text color="GrayText">
          <PhoneIcon mr={2} />
          6955429485
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
