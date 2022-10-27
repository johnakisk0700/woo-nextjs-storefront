import Link from "next/link";
import SideCart from "../cart/side-cart/SideCart";
import React, { useState, useMemo } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Flex,
  Container,
  useColorMode,
  Show,
  Text,
} from "@chakra-ui/react";
import { MdModeNight, MdLightMode } from "react-icons/md";
import { navbarLinks } from "../../navbarLinks";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="8xl">
      <Flex justifyContent={"space-between"} alignItems="center">
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Show below="xl">
              <BurgerMenu />
            </Show>
            <Logo />
          </Flex>

          <Flex ml={3} display={{ base: "none", xl: "flex" }}>
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
        <Text fontSize="sm">{navbarLink.name}</Text>
      </MenuButton>
      {hasChildren && (
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} boxShadow={"xl"}>
          {navbarLink.children.map((child, i) => (
            <MenuItem key={i}>
              <Link href={`/kathgoria/${child.slug}`}>
                <Text fontSize="sm">{child.name}</Text>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      )}
    </Menu>
  );
};

export default Nav;
