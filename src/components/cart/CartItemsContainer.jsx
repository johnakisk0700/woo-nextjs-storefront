import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { CartItem } from "./CartItem";
import { Box, Button, Stack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

// variant is for "sidecart" or "cartpage"
const CartItemsContainer = ({ variant }) => {
  // @TODO wil use it in future variations of the project.
  const { cart, setCart, refetchCart, loadingCart, clearCart } =
    useContext(CartContext);

  return (
    <>
      {cart && (
        <Box>
          <Button
            onClick={() => clearCart()}
            width="min-content"
            alignSelf="flex-end"
            ml="auto"
            display="block"
            variant="outline"
            mb={2}
          >
            <DeleteIcon />
          </Button>
          <Stack gap={2}>
            {cart?.products?.length &&
              cart.products.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  getCartProcessing={loadingCart}
                  product={item}
                  variant={variant}
                />
              ))}
          </Stack>
        </Box>
      )}
      {!cart && (
        <h2 className="text-2xl mb-5">Δεν υπάρχουν προιόντα στο καλάθι σας.</h2>
      )}
    </>
  );
};

export default CartItemsContainer;
