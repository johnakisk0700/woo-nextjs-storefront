import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiMinus, BiPlus } from "react-icons/bi";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Logo from "./Logo";
import { navbarLinks } from "../../navbarLinks";
import Link from "next/link";
import Image from "next/image";

const BurgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Button ref={btnRef} variant="ghost" onClick={onOpen} p={2} mr={2}>
        <GiHamburgerMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Logo />
            <DrawerCloseButton position="unset" />
          </DrawerHeader>

          <DrawerBody>
            <BurgerCategories onClose={onClose} />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const BurgerCategories = ({ onClose }) => {
  const invertPercentage = useColorModeValue("0%", "100%");
  return (
    <Accordion>
      {navbarLinks.map((category) => (
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Flex
                    flex="1"
                    textAlign="left"
                    height="48px"
                    alignItems="center"
                  >
                    {category.img && (
                      <img
                        src={category.img}
                        height="24px"
                        width="24px"
                        style={{
                          filter: `invert(${invertPercentage})`,
                          marginRight: "8px",
                        }}
                      ></img>
                    )}
                    {category.name}
                  </Flex>
                  {isExpanded ? (
                    <BiMinus fontSize="12px" />
                  ) : (
                    <BiPlus fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack>
                  {category.children &&
                    category.children.map((subcategory) => (
                      <Link href={`/kathgoria/${subcategory.slug}`}>
                        <Button
                          variant="ghost"
                          justifyContent="flex-start"
                          onClick={onClose}
                        >
                          {subcategory.name}
                        </Button>
                      </Link>
                    ))}
                </Stack>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default BurgerMenu;
