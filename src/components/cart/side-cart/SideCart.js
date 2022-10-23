import { useContext, useRef } from "react";
import { CartContext } from "../../context/CartProvider";
import Link from "next/link";
import {
  Button,
  chakra,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  shouldForwardProp,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import CartItemsContainer from "../CartItemsContainer";
import { motion, isValidMotionProp } from "framer-motion";
import { AnimationBox } from "../../AnimationBox";

const SideCart = () => {
  const { cart, loadingCart } = useContext(CartContext);

  const productsCount =
    cart !== null && Object.keys(cart).length ? cart.totalProductsCount : "";
  const totalPrice =
    cart !== null && Object.keys(cart).length ? cart.totalProductsPrice : "";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Button onClick={onOpen} ref={btnRef} variant="ghost">
        <Flex alignItems={"center"}>
          <FaShoppingCart />
          <Text mx={1}>({productsCount ? productsCount : "0"})</Text>
          <AnimationBox
            animate={{
              scale: [0.8, 1],
            }}
            // key important for retriggering animation
            key={totalPrice}
            transition={{
              duration: 0.12,
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {totalPrice ? <span>{totalPrice.toFixed(2)}€</span> : "0.00€"}
          </AnimationBox>
        </Flex>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
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
            <Text>Καλάθι</Text>
            <DrawerCloseButton position="unset" />
          </DrawerHeader>

          <DrawerBody>
            <CartItemsContainer variant="sidecart" />
          </DrawerBody>

          <DrawerFooter flexDirection="column">
            <Divider />
            <Flex
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              py={5}
            >
              <Text fontSize="1rem">Σύνολο:</Text>

              <Text fontSize="1.25rem" lineHeight="1.25rem" fontWeight="bold">
                <AnimationBox
                  animate={{
                    scale: [0.8, 1],
                  }}
                  // key important for retriggering animation
                  key={totalPrice}
                  transition={{
                    duration: 0.12,
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {totalPrice ? totalPrice.toFixed(2) : "0.00"}€
                </AnimationBox>
              </Text>
            </Flex>
            <Link href="/checkout">
              <Button w={"100%"} colorScheme="yellow" py={6} onClick={onClose}>
                Παραγγελία
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideCart;
