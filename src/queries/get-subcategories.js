import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_SUBCATEGORIES_QUERY = gql`
  query {
    productCategories(where: { childless: true }) {
      nodes {
        ancestors {
          nodes {
            name
            id
            slug
            image {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export default GET_SUBCATEGORIES_QUERY;
