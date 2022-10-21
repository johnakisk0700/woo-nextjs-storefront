import Product from "../src/components/products/Product";
import client from "../src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import ProductGrid from "../src/components/products/ProductGrid";
import { Heading } from "@chakra-ui/react";

export default function Home(props) {
  const { products, productCategories, heroCarousel } = props || {};

  return (
    <>
      <Heading as={"h1"} fontSize="md" mb={4}>
        Products
      </Heading>
      <ProductGrid>
        {products.length
          ? products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          : ""}
      </ProductGrid>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });

  return {
    props: {
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes
        ? data.heroCarousel.nodes[0].children.nodes
        : [],
    },
    revalidate: 1,
  };
}
