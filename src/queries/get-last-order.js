import { gql } from "@apollo/client";

/**
 * GraphQL countries query.
 */
const GET_LAST_ORDER = gql`
  query LastOrderQuery {
    customer {
      email
    }
  }
`;

export default GET_LAST_ORDER;
