import { gql } from "@apollo/client";

const FILL_CART = gql`
  mutation FILL_CART_MUTATION($input: FillCartInput!) {
    fillCart(input: $input) {
      cartErrors {
        reasons
      }
      added {
        total
      }
    }
  }
`;

export default FILL_CART;
