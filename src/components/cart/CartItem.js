import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { v4 } from "uuid";
import { getUpdatedItems } from "../../functions";
import { formatPrice } from "../../helpers/priceFormatter";
import { Cross, Loading } from "../icons";
import { debounce } from "lodash";

export const CartItem = ({
  item,
  products,
  updateCartProcessing,
  getCartProcessing,
  handleRemoveProduct,
  updateCart: updateCartQuery,
  variant,
}) => {
  const [productCount, setProductCount] = useState(item.qty);
  // everytime cart updates, bring the new backend values
  // here to avoid someone clicking like an autist
  useEffect(() => {
    setProductCount(item.qty);
  }, [products]);

  const loading = getCartProcessing || updateCartProcessing;

  const debouncedUpdateCart = useMemo(
    () =>
      debounce((newQty, products) => {
        console.log(`updating item ${item.name} to qty: ${newQty}`);
        const updatedItems = getUpdatedItems(products, newQty, item.cartKey);
        updateCartQuery({
          variables: {
            input: {
              clientMutationId: v4(),
              items: updatedItems,
            },
          },
        });
      }, 500),
    []
  );
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

  const handleQtyBump = (n) => {
    if (productCount + n === 0) handleRemoveProduct(item.cartKey, products);
    else {
      const newQty = productCount + n;
      setProductCount(newQty);
      debouncedUpdateCart(newQty, products);
    }
  };

  const bg = useColorModeValue("gray.50", "gray.600");

  return (
    <>
      {variant === "sidecart" && (
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
            <Box width="64px" textAlign="center">
              {!loading && (
                <Text mr={2} fontWeight="bold">
                  {formatPrice(item.totalPrice)}
                </Text>
              )}
              {loading && <Spinner size="xs" />}
            </Box>
            <Stack alignItems="center">
              <Button
                variant="ghost"
                onClick={() => handleQtyBump(1)}
                disabled={loading}
                height="32px"
              >
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
              <Button
                variant="ghost"
                onClick={() => handleQtyBump(-1)}
                disabled={loading}
                height="32px"
              >
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
      )}
      {variant === "cartpage" && (
        <tr className="woo-next-cart-item" key={item.productId}>
          <th className="woo-next-cart-element woo-next-cart-el-close">
            {/* Remove item */}
            <span
              className="woo-next-cart-close-icon cursor-pointer"
              onClick={(event) =>
                handleRemoveProduct(event, item.cartKey, products)
              }
            >
              <Cross />
            </span>
          </th>
          <td className="woo-next-cart-element">
            <img
              width="64"
              src={item.image.sourceUrl}
              srcSet={item.image.srcSet}
              alt={item.image.title}
            />
          </td>
          <td className="woo-next-cart-element">{item.name}</td>
          <td className="woo-next-cart-element">
            {formatPrice(item.totalPrice)}
          </td>

          {/* Qty Input */}
          <td className="woo-next-cart-element woo-next-cart-qty">
            {/* @TODO Need to update this with graphQL query */}
            <input
              type="number"
              min="1"
              data-cart-key={item.cartKey}
              className={`woo-next-cart-qty-input form-control ${
                updateCartProcessing ? "opacity-25 cursor-not-allowed" : ""
              } `}
              value={productCount}
              onChange={(event) => handleQtyChange(event, item.cartKey)}
            />
          </td>
          <td className="woo-next-cart-element">
            {"string" !== typeof item.totalPrice
              ? item.totalPrice.toFixed(2)
              : formatPrice(item.totalPrice)}
          </td>
        </tr>
      )}
    </>
  );
};
