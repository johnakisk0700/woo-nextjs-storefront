import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
import GET_COUNTRIES from "../src/queries/get-countries";
import client from "../src/components/ApolloClient";
import { Heading, Text } from "@chakra-ui/react";

const Checkout = ({ data }) => (
  <>
    <div className="checkout container mx-auto my-32 px-4 xl:px-0">
      <Heading as="h1" fontSize="1.5rem" mb={12}>
        Ολοκλήρωση Παραγγελίας
      </Heading>
      <CheckoutForm />
    </div>
  </>
);

export default Checkout;

export async function getStaticProps() {
  return {
    props: {},
  };
}
