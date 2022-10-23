import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { AnimationBox } from "../AnimationBox";

export const CartItem = ({
  item,
  product,
  handleRemoveProduct,
  updateCart: updateCartQuery,
  variant,
}) => {
  const [productCount, setProductCount] = useState(item.qty);
  const { bumpProductQty } = useContext(CartContext);

  /*
   * When user changes the qty from product input update the cart in localStorage
   * Also update the cart in global context
   *
   * @param {Object} event event
   *
   * @return {void}
   */
  const handleQtyChange = (event, cartKey) => {
    if (process.browser) {
      if (event) {
        event.stopPropagation();
      }

      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }

      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      const newQty = event.target.value ? parseInt(event.target.value) : 1;

      // Set the new qty in state.
      setProductCount(newQty);

      if (products.length) {
        updateCart(newQty);
      }
    }
  };

  const bg = useColorModeValue("gray.50", "gray.600");

  const handleBumpQty = (n) => () => {
    bumpProductQty(product, n);
    setProductCount((prev) => prev + n);
  };

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        my={4}
        backgroundColor={bg}
        borderRadius={8}
        p={2}
        height="128px"
      >
        <Flex alignItems="center">
          <img
            style={{
              maxHeight: "100%",
              maxWidth: "72px",
              borderRadius: "8px",
            }}
            src={item.image.sourceUrl}
            srcSet={item.image.srcSet}
            alt={item.image.title}
          />
          <Text
            fontSize="0.875rem"
            ml={1}
            maxHeight="100%"
            overflow="hidden"
            lineHeight="1rem"
          >
            {item.name}
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Box width="72px" textAlign="center">
            <Text mr={2} fontWeight="bold">
              <AnimationBox
                animate={{
                  scale: [0.8, 1],
                }}
                // key important for retriggering animation
                key={item.totalPrice}
                transition={{
                  duration: 0.12,
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {item.totalPrice.toFixed(2)}€
              </AnimationBox>
            </Text>
          </Box>
          <Stack alignItems="center">
            <Button variant="ghost" onClick={handleBumpQty(1)} height="32px">
              +
            </Button>
            <Input
              onChange={(e) => handleQtyChange(e)}
              value={productCount}
              width="2.25rem"
              textAlign="center"
              fontSize="1rem"
              bg={bg}
              p={0}
            />
            <Button variant="ghost" onClick={handleBumpQty(-1)} height="32px">
              -
            </Button>
          </Stack>
          {/* <Button
              p={0}
              onClick={(event) => handleRemoveProduct(item.cartKey, products)}
            >
              <Cross />
            </Button> */}
        </Flex>
      </Flex>
    </>
  );
};
