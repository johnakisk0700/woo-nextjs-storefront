import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { debounce, throttle } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import { getFormattedCart } from "../../functions";
import GET_CART from "../../queries/get-cart";

export const CartContext = React.createContext([{}, () => {}]);

export const CartProvider = (props) => {
  const [cart, setCart] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (process.browser) {
      // get with expiry to avoid weird issues with users coming back
      // a month later lol
      let cartData = getWithExpiry("woo-next-cart");
      setCart(cartData);
    }
  }, []);

  const addProductToCart = (product, qty) => {
    // check if item exists, if it does bump the quantity
    const itemExists = cart?.products.some(
      (cartProduct) => cartProduct.productId === product.productId
    );
    if (itemExists) bumpProductQty(product, 1);
    else {
      // else just add the item to the array
      let newProducts = cart?.products ? [...cart.products] : [];
      newProducts.push({
        ...product,
        qty: 1,
        price: parseFloat(product.priceRaw),
        totalPrice: parseFloat(product.priceRaw),
      });
      toast({
        position: "top-right",
        render: () => <CustomToastRenderer product={product} />,
        duration: 2500,
        containerStyle: {
          maxWidth: "100vw",
          width: "400px",
          minWidth: "200px",
        },
      });

      calculateCartTotalsAndSubmit(newProducts);
    }
  };

  const bumpProductQty = (product, n) => {
    let newProducts = cart.products ? [...cart.products] : [];

    // find the index
    const productIndex = newProducts.findIndex(
      (cartProduct) => cartProduct.productId === product.productId
    );
    let newProduct = newProducts[productIndex];

    // no more than 99
    if (newProduct.qty + n > 99) return;

    if (newProduct.qty + n <= 0) {
      // if we hit 0 remove the item and do nothing else
      newProducts = newProducts.filter(
        (newProduct) => product.productId !== newProduct.productId
      );
    }
    // else execute the bump
    else {
      //update qty and totalPrice

      newProduct.qty += n;
      newProduct.totalPrice = newProduct.qty * newProduct.price;
    }

    calculateCartTotalsAndSubmit(newProducts);
  };

  const changeProductQty = (product, n) => {
    //parse num
    n = parseInt(n);
    let newProducts = cart.products ? [...cart.products] : [];

    // find the index
    const productIndex = newProducts.findIndex(
      (cartProduct) => cartProduct.productId === product.productId
    );
    let newProduct = newProducts[productIndex];

    // if we hit 0 remove the item and do nothing else
    if (n <= 0) {
      newProducts = newProducts.filter(
        (newProduct) => product.productId !== newProduct.productId
      );
    }
    // else execute the bump
    else {
      //update qty and totalPrice
      newProduct.qty = n;
      newProduct.totalPrice = newProduct.qty * newProduct.price;
    }

    calculateCartTotalsAndSubmit(newProducts);
  };

  // it does exactly what its name suggests, to be
  // consumed internally by other functions
  const calculateCartTotalsAndSubmit = (products) => {
    let totalProductsCount = 0;
    let totalProductsPrice = 0;
    products.forEach((product) => {
      totalProductsCount += product.qty;
      totalProductsPrice += product.totalPrice;
    });

    // if no products, turn cart to "null" specifically because it is used in checks
    if (totalProductsCount === 0) {
      setCart(null);
      setWithExpiry("woo-next-cart", null, expirationTime);
      return;
    }

    // else set the new cart both on state and localStorage
    let newCart = { products, totalProductsCount, totalProductsPrice };
    setCart(newCart);
    setWithExpiry("woo-next-cart", newCart, expirationTime);
  };

  const clearCart = () => {
    setCart(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        setCart: setCart,
        addProductToCart,
        changeProductQty,
        bumpProductQty,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

const CustomToastRenderer = ({ product }) => {
  const bg = useColorModeValue("white", "gray.800");
  const router = useRouter();
  const toast = useToast();
  return (
    <Box bg={bg} boxShadow="dark-lg" py={4} borderRadius={4}>
      <Text textAlign="center" color="GrayText" mb={2}>
        Προσθέσατε το προιόν:
      </Text>
      <Divider />
      <TableContainer maxW="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th isNumeric>Τιμή</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td display="flex" alignItems="center" gap={4}>
                <Image
                  src={product.image.sourceUrl}
                  width="64px"
                  height="64px"
                  objectFit="cover"
                />
                <Text
                  maxWidth="150px"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {product.name}
                </Text>
              </Td>
              <Td isNumeric fontWeight="bold">
                {product.price}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider />
      <Button
        onClick={() => {
          router.push("/checkout");
          toast.closeAll();
        }}
        colorScheme="yellow"
        width="90%"
        mt={4}
        mx="auto"
        display="block"
      >
        Καλάθι
      </Button>
    </Box>
  );
};

const expirationTime = 2 * 60 * 60 * 1000;

function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  if (!item) return null;
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
