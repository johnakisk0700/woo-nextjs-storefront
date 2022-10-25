import Layout from "../../src/components/Layout";
import client from "../../src/components/ApolloClient";
import Product from "../../src/components/products/Product";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import ProductGrid from "../../src/components/products/ProductGrid";
import { useEffect, useMemo, useRef, useState } from "react";
import { navbarLinks } from "../../src/navbarLinks";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import CategoryListItem from "../../src/components/category/CategoryListItem";
import { salesSort } from "../../src/helpers/salesSort";

export default function CategorySingle(props) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { categoryName, products } = props;

  // Find what category we're viewing, and pick the links from generated navbarLinks to show
  // as a list next to products
  const subcategories = useMemo(() => {
    let subs = navbarLinks.find((element) =>
      element.children.some((subElement) => subElement.name === categoryName)
    )?.children;
    return subs;
  }, [categoryName]);

  const [sort, setSort] = useState("priceAsc");
  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    let sorted;
    switch (sort) {
      case "priceAsc":
        sorted = [...products].sort((a, b) => a.priceRaw - b.priceRaw);
        break;
      case "priceDesc":
        sorted = [...products].sort((a, b) => b.priceRaw - a.priceRaw);
        break;
      case "sales":
        sorted = [...products].sort(salesSort);
        break;
    }
    setSortedProducts(sorted);
  }, [sort, products]);

  return (
    <>
      <Flex>
        <Stack
          flexBasis={{ md: "15%", xl: "10%" }}
          mr={4}
          mt={12 + 4}
          display={{ base: "none", md: "block" }}
        >
          {subcategories?.length &&
            subcategories.map((subcategory) => (
              <CategoryListItem
                selected={subcategory.name === categoryName}
                category={subcategory}
                key={subcategory.slug}
              />
            ))}
        </Stack>
        <Box flexBasis={{ base: "100%", md: "85%", xl: "90%" }}>
          <Select
            size="lg"
            width="max-content"
            fontSize="1rem"
            mb={4}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="priceAsc">Φτηνότερο πρώτα</option>
            <option value="priceDesc">Ακριβότερο πρώτα</option>
            <option value="sales">Προσφορές πρώτα</option>
          </Select>
          <ProductGrid>
            {sortedProducts?.length &&
              sortedProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
          </ProductGrid>
        </Box>
      </Flex>
    </>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug },
  });

  return {
    props: {
      categoryName: data?.productCategory?.name ?? "",
      products: data?.productCategory?.products?.nodes ?? [],
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({ params: { slug: productCategory?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
