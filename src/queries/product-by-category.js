import { gql } from "@apollo/client";

export const PRODUCT_BY_CATEGORY_SLUG = gql`
  query PRODUCT_BY_CATEGORY_SLUG($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      products {
        nodes {
          id
          productId: databaseId
          averageRating
          slug
          description
          image {
            id
            uri
            title
            srcSet
            sourceUrl
          }
          name
          ... on SimpleProduct {
            price
            priceRaw: price(format: RAW)
            stockStatus
            onSale
            regularPrice
            id
          }
          ... on VariableProduct {
            price
            priceRaw: price(format: RAW)
            stockStatus
            onSale
            regularPrice
            id
          }
          ... on ExternalProduct {
            price
            priceRaw: price(format: RAW)
            onSale
            id
            regularPrice
            externalUrl
          }
          ... on GroupProduct {
            products {
              nodes {
                ... on SimpleProduct {
                  id
                  regularPrice
                  price
                  priceRaw: price(format: RAW)
                  stockStatus
                  onSale
                }
              }
            }
            id
          }
        }
      }
    }
  }
`;

export const PRODUCT_CATEGORIES_SLUGS = gql`
  query PRODUCT_CATEGORIES_SLUGS {
    productCategories {
      nodes {
        id
        slug
      }
    }
  }
`;
