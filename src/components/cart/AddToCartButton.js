import { useContext } from "react";
import { v4 } from "uuid";

import { CartContext } from "../context/CartProvider";
import { Button, useToast } from "@chakra-ui/react";

const AddToCart = (props) => {
  const { product } = props;

  const { cart, setCart, addProductToCart } = useContext(CartContext);

  // Add to Cart Mutation.
  const productQueryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
  };

  const handleAddToCartClick = async () => {
    addProductToCart(product);
  };

  return (
    <>
      <Button
        colorScheme={"yellow"}
        onClick={handleAddToCartClick}
        mr="2"
        variant="solid"
        width={"100%"}
      >
        Προσθήκη
      </Button>
      {/*	@TODO Check if its an external product then put its external buy link */}
      {/* {"ExternalProduct" === product.__typename ? (
        <a
          href={product?.externalUrl ?? "/"}
          target="_blank"
          className="px-3 py-1 rounded-sm mr-3 text-sm border-solid border border-current inline-block hover:bg-purple-600 hover:text-white hover:border-purple-600"
        >
          Buy now
        </a>
      ) } */}
    </>
  );
};

export default AddToCart;
