import { useContext } from "react";
import { v4 } from "uuid";

import { CartContext } from "../context/CartProvider";
import { Button, useToast } from "@chakra-ui/react";

const AddToCart = (props) => {
  const { product } = props;

  const { cart, setCart, addProductToCart } = useContext(CartContext);

  const handleAddToCartClick = async () => {
    addProductToCart(product);
  };

  return (
    <>
      <Button
        onClick={handleAddToCartClick}
        mr="2"
        variant="outline"
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
