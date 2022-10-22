import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { MdDeliveryDining } from "react-icons/md";

const Logo = () => {
  return (
    <Link href="/">
      <a className="">
        <Flex alignItems="center">
          <MdDeliveryDining size="36px" />
          <Text fontWeight="black" position="relative" fontSize="1.125rem">
            <Text as="span" sx={gtp}>
              gia thn
            </Text>
            poutsa-market
            <Text as="span" fontSize="0.625rem" position="relative" top={-2}>
              ™
            </Text>
          </Text>
        </Flex>
      </a>
    </Link>
  );
};

const gtp = {
  position: "absolute",
  top: "-2px",
  left: 0,
  color: "red.500",
  fontSize: "0.425rem",
};

export default Logo;
