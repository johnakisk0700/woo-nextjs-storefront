import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { v4 } from "uuid";
import cx from "classnames";

import { AppContext } from "../context/AppContext";
import { getFormattedCart } from "../../functions";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";

const AddToCart = (props) => {
  const { product } = props;

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { data, refetch: refetchCart } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetchCart();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });

  const handleAddToCartClick = async () => {
    setRequestError(null);
    await addToCart();
  };

  return (
    <>
      {/*	Check if its an external product then put its external buy link */}
      {/* {"ExternalProduct" === product.__typename ? (
        <a
          href={product?.externalUrl ?? "/"}
          target="_blank"
          className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current inline-block hover:bg-purple-600 hover:text-white hover:border-purple-600"
        >
          Buy now
        </a>
      ) } */}
      <Button
        colorScheme={"yellow"}
        isLoading={addToCartLoading}
        onClick={handleAddToCartClick}
        mr="2"
        variant="solid"
        width={"100%"}
      >
        Προσθήκη
      </Button>
    </>
  );
};

export default AddToCart;
