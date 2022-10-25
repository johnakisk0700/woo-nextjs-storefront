import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_LAST_ORDER = gql`
  query LastOrderQuery {
    customer {
      orders {
        nodes {
          date
          metaData(key: "orofos") {
            value
          }
        }
      }
    }
  }
`;

export default GET_LAST_ORDER;
