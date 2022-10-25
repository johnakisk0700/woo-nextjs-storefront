import { gql } from "@apollo/client";

const UPDATE_CUSTOMER = gql`
  mutation UPDATE_CUSTOMER($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        email
      }
    }
  }
`;

export default UPDATE_CUSTOMER;
