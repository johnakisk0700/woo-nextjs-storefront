import { gql } from "@apollo/client";

const FILL_CART = gql`
  mutation {
    fillCart(
      input: { items: { productId: 28, quantity: 10 }, clientMutationId: "" }
    ) {
      cartErrors {
        reasons
      }
      added {
        total
      }
    }
  }
`;

export default ADD_TO_CART;
