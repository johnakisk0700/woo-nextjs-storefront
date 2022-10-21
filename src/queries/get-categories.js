import { gql } from "@apollo/client";

/**
 * GraphQL categories query.
 */
const GET_CATEGORIES_QUERY = gql`
  query {
    productCategories(where: { parent: 0 }) {
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
`;

export default GET_CATEGORIES_QUERY;
