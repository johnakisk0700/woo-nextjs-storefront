import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { CartItem } from "./CartItem";
import { Button } from "@chakra-ui/react";

// variant is for "sidecart" or "cartpage"
const CartItemsContainer = ({ variant }) => {
  // @TODO wil use it in future variations of the project.
  const { cart, setCart, refetchCart, loadingCart, clearCart } =
    useContext(CartContext);

  return (
    <>
      {cart && (
        <>
          <Button
            marginLeft="auto"
            display="block"
            onClick={() => clearCart()}
            width="min-content"
          >
            Καθαρισμός
          </Button>
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
        </>
      )}
      {!cart && (
        <h2 className="text-2xl mb-5">Δεν υπάρχουν προιόντα στο καλάθι σας.</h2>
      )}
    </>
  );
};

export default CartItemsContainer;
