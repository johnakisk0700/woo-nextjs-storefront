import { gql } from "@apollo/client";

/**
 * GraphQL categories and subcategories query.
 */
const GET_NAVBAR_QUERY = gql`
  query {
    productCategories(where: { parent: 0 }) {
      nodes {
        name
        children {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default GET_NAVBAR_QUERY;
