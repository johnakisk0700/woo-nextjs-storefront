import { Text } from "@chakra-ui/react";
import CartItemsContainer from "../cart/CartItemsContainer";

const YourOrder = ({ cart }) => {
  return (
    <>
      {cart && (
        <>
          {/*Product Listing*/}
          <Text
            textAlign={{ base: "center", md: "right" }}
            fontSize="xl"
            fontWeight="bold"
            mb={4}
          >
            Καλάθι
          </Text>
          <CartItemsContainer />
        </>
      )}
    </>
  );
};

export default YourOrder;
