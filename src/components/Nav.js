import Link from "next/link";
import SideCart from "./cart/side-cart/SideCart";
import React, { useState, useMemo } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  useDisclosure,
  Flex,
  Container,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdModeNight, MdLightMode, MdDeliveryDining } from "react-icons/md";
import { navbarLinks } from "../navbarLinks";

const Nav = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="8xl">
      <Flex justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center">
          <Link href="/">
            <a className="">
              <Flex alignItems="center">
                <MdDeliveryDining size="36px" />
                <Text fontWeight="black" position="relative">
                  <Text as="span" sx={gtp}>
                    gia thn
                  </Text>
                  poutsa-market™
                </Text>
              </Flex>
            </a>
          </Link>

          <Flex ml={3} display={{ base: "none", md: "flex" }}>
            {navbarLinks.map((navbarLink) => (
              <NavbarLink navbarLink={navbarLink} key={navbarLink.name} />
            ))}
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <Button variant="ghost" onClick={toggleColorMode} mr={2}>
            {colorMode === "light" ? <MdLightMode /> : <MdModeNight />}
          </Button>
          {/* SideCart below holds the whole cart */}
          <SideCart />
        </Flex>
      </Flex>
    </Container>
  );
};

const NavbarLink = ({ navbarLink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // useMemo because it's gonna update a lot onMouseEnter/onMouseLeave
  const hasChildren = useMemo(
    () => navbarLink.children.length > 0,
    [navbarLink]
  );
  return (
    <Menu isOpen={isOpen} gutter={0}>
      <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
        {navbarLink.name}
      </MenuButton>
      {hasChildren && (
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} boxShadow={"xl"}>
          {navbarLink.children.map((child, i) => (
            <MenuItem key={i}>
              <Link href={`/kathgoria/${child.slug}`}>{child.name}</Link>
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
};

const gtp = {
  position: "absolute",
  top: "-4px",
  left: 0,
  color: "red.500",
  fontSize: "0.425rem",
};

export default Nav;
