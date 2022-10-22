import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";

const Price = ({ regularPrice = 0, salesPrice }) => {
  if (isEmpty(salesPrice)) {
    return null;
  }

  /**
   * Get discount percent.
   *
   * @param {String} regularPrice
   * @param {String} salesPrice
   */
  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null;
    }

    const parsedRegularPrice = parseFloat(
      regularPrice.split("&")[0].replace(",", ".")
    );
    const parsedSalesPrice = parseFloat(
      salesPrice.split("&")[0].replace(",", ".")
    );

    const discountPercent =
      ((parsedRegularPrice - parsedSalesPrice) / parsedRegularPrice) * 100;

    return {
      discountPercent:
        parsedSalesPrice !== parsedRegularPrice
          ? `(-${discountPercent.toFixed(2)}%)`
          : null,
      isOnSale: parsedSalesPrice < parsedRegularPrice,
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <Heading fontSize="1.075rem" display="flex">
      {!productMeta?.isOnSale && <Text>{regularPrice}</Text>}
      {productMeta?.isOnSale && (
        <Box position="relative">
          <Text
            position="absolute"
            top="-1rem"
            fontSize="0.875rem"
            fontWeight="light"
            textDecoration="line-through"
          >
            {regularPrice}
          </Text>
          <Flex alignItems="center">
            <Text>{salesPrice}</Text>
            <Text color="green.400" fontSize="0.875rem">
              {productMeta?.discountPercent}
            </Text>
          </Flex>
        </Box>
      )}
    </Heading>
  );
};

export default Price;
