import { gql } from "@apollo/client";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`
  query {
    heroCarousel: productCategories(where: { slug: "offers" }) {
      nodes {
        id
        children {
          nodes {
            id
            name
            slug
            databaseId
            description
            image {
              id
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
    productCategories(first: 3) {
      nodes {
        id
        name
        slug
        image {
          id
          sourceUrl
          srcSet
        }
      }
    }
    products(first: 50) {
      nodes {
        id
        productId: databaseId
        averageRating
        slug
        description
        image {
          id
          altText
          sourceUrl
        }
        name
        ... on SimpleProduct {
          price
          priceRaw: price(format: RAW)
          regularPrice
          id
        }
        ... on VariableProduct {
          price
          priceRaw: price(format: RAW)
          id
          regularPrice
        }
        ... on ExternalProduct {
          price
          priceRaw: price(format: RAW)
          id
          externalUrl
          regularPrice
        }
        ... on GroupProduct {
          id
          products {
            nodes {
              ... on SimpleProduct {
                id
                price
                priceRaw: price(format: RAW)
                regularPrice
              }
            }
          }
        }
      }
    }
  }
`;

export default PRODUCTS_AND_CATEGORIES_QUERY;
