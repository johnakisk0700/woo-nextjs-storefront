import AddToCartButton from "../cart/AddToCartButton";
import Price from "../single-product/price";
import Image from "next/image";
import { Box, Grid, Heading, useColorModeValue } from "@chakra-ui/react";

const Product = (props) => {
  const { product } = props;
  const bg = useColorModeValue("white", "gray.700");
  return (
    // @TODO Need to handle Group products differently.
    <>
      {product && product.__typename !== "GroupProduct" && (
        <Grid
          backgroundColor={bg}
          p={4}
          borderRadius={8}
          boxShadow={"md"}
          filter={product.stockStatus === "OUT_OF_STOCK" ? "grayscale(1)" : ""}
        >
          <Image
            width="300"
            height="300"
            layout="responsive"
            objectFit="contain"
            loading="lazy"
            src={product?.image?.sourceUrl ?? ""}
            alt={product?.image?.altText ?? product?.slug}
          />
          <Box width="100%" mt={2} mb={2}>
            <Heading
              as="h5"
              fontSize="0.875rem"
              height="36px"
              noOfLines={2}
              fontWeight="medium"
              overflow="hidden"
              mb={5}
            >
              {product.name && product.name}
            </Heading>
            <Price
              salesPrice={product?.price}
              regularPrice={product?.regularPrice}
            />
          </Box>
          <AddToCartButton product={product} />
        </Grid>
      )}
    </>
  );
};

export default Product;
