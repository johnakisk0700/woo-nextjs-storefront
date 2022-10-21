import Link from "next/link";
import AddToCartButton from "../cart/AddToCartButton";
import Price from "../single-product/price";
import Image from "next/image";
import { DEFAULT_PRODUCT_HOME_IMG_URL } from "../../constants/urls";
import { Box, Flex, Grid, Heading, useColorModeValue } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
const Product = (props) => {
  const { product } = props;
  const bg = useColorModeValue("gray.50", "gray.700");

  return (
    // @TODO Need to handle Group products differently.
    product && "GroupProduct" !== product.__typename ? (
      <Grid backgroundColor={bg} p={4} borderRadius={8} boxShadow={"md"}>
        <Link href={`/product/${product?.slug}`}>
          <ChakraLink display="block" borderRadius={6} overflow="hidden">
            <Image
              width="300"
              height="300"
              layout="responsive"
              objectFit="contain"
              loading="lazy"
              src={product?.image?.sourceUrl ?? ""}
              alt={product?.image?.altText ?? product?.slug}
            />
          </ChakraLink>
        </Link>
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
    ) : null
  );
};

export default Product;
