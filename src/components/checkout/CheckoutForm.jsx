import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";

import { CartContext } from "../context/CartProvider";
import validateAndSanitizeCheckoutForm from "../../validator/checkout";
import { createCheckoutData } from "../../functions";
import OrderSuccess from "./OrderSuccess";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import PersonalInfoForm from "./PersonalInfoForm";
import {
  handleBillingDifferentThanShipping,
  handleCreateAccount,
  handleStripeCheckout,
  setStatesForCountry,
} from "../../utils/checkout";
import CLEAR_CART_MUTATION from "../../mutations/clear-cart";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import FILL_CART from "../../mutations/fill-cart";
import { v4 } from "uuid";
import { DEFAULT_ERROR_TOAST } from "../../constants/urls";
import CartItemsContainer from "../cart/CartItemsContainer";
import UPDATE_CUSTOMER from "../../mutations/update-customer";
const defaultKoudouni = "ΣΤΑΥΡΟΠΟΥΛΟΣ";
const defaultOrofos = "9ος";
// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
const defaultCustomerInfo = {
  firstName: "Ιωάννιος",
  lastName: "Σταυροπούλιος",
  address1: "Ροδόπης 69",
  koudouni: defaultKoudouni,
  orofos: defaultOrofos,
  city: "Πάτρα",
  country: "GR",
  postcode: "221029",
  email: "arxidia@gmail.com",
  phone: "6989305290",
  errors: null,
};

// const defaultCustomerInfo = {
//   firstName: "",
//   lastName: "",
//   address1: "",
//   address2: "",
//   city: "Πάτρα",
//   country: "GR",
//   state: "",
//   postcode: "",
//   email: "",
//   phone: "",
//   company: "",
//   errors: null,
// };

const initialState = {
  billing: {
    ...defaultCustomerInfo,
  },
  shipping: {
    ...defaultCustomerInfo,
  },
  createAccount: false,
  customerNote: "",
  billingDifferentThanShipping: false,
  paymentMethod: "cod",
  koudouni: defaultKoudouni,
  orofos: defaultOrofos,
};

const CheckoutForm = () => {
  const router = useRouter();
  const toast = useToast();

  const { cart, setCart } = useContext(CartContext);
  const [input, setInput] = useState(initialState);
  const [orderData, setOrderData] = useState(null);
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] =
    useState(false);
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [createdOrderData, setCreatedOrderData] = useState({});

  // stripe
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isStripeOrderProcessing, setIsStripeOrderProcessing] = useState(false);

  // Create New order: Checkout Mutation.
  const [checkout, { data: checkoutResponse, loading: isOrderProcessing }] =
    useMutation(CHECKOUT_MUTATION, {
      variables: {
        input: orderData,
      },
      onCompleted: () => {
        localStorage.setItem("woo-next-cart", null);
        setCart(null);
        localStorage.setItem(
          "last-order-details",
          JSON.stringify({ ...orderData, ...cart })
        );
        router.push("/checkout-success");
      },
      onError: (error) => {
        toast(DEFAULT_ERROR_TOAST);
      },
    });

  const [fillCart, { data: fillCartRes, loading: fillCartLoading }] =
    useMutation(FILL_CART, {
      variables: {
        input: cart && createFillCartData(cart),
      },
      onCompleted: () => {
        // updateCustomer();
        checkout();
      },
      onError: (error) => {
        toast(DEFAULT_ERROR_TOAST);
      },
    });

  // might need later...
  // const [
  //   updateCustomer,
  //   { data: updateCustomerResponse, loading: isUpdatingCustomer },
  // ] = useMutation(UPDATE_CUSTOMER, {
  //   variables: {
  //     input: { email: orderData?.billing?.email },
  //   },
  //   onCompleted: () => {},
  //   onError: (error) => {
  //     toast(DEFAULT_ERROR_TOAST);
  //   },
  // });

  const [clearCartMutation] = useMutation(CLEAR_CART_MUTATION);

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * 1. If billing is different than shipping PersonalInfoForm, only then validate billing.
     * 2. We are passing theBillingStates?.length and theShippingStates?.length, so that
     * the respective states should only be mandatory, if a country has states.
     */
    const billingValidationResult = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(
          input?.billing,
          theBillingStates?.length
        )
      : { errors: null, isValid: true };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
      theShippingStates?.length
    );
    console.log(
      !shippingValidationResult.isValid || !billingValidationResult.isValid
    );
    console.log(shippingValidationResult.errors);
    console.log(billingValidationResult.errors);

    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      setInput({
        ...input,
        billing: { ...input.billing, errors: billingValidationResult.errors },
        shipping: {
          ...input.shipping,
          errors: shippingValidationResult.errors,
        },
      });

      return;
    }

    if ("stripe-mode" === input.paymentMethod) {
      const createdOrderData = await handleStripeCheckout(
        input,
        cart?.products,
        setRequestError,
        clearCartMutation,
        setIsStripeOrderProcessing,
        setCreatedOrderData
      );
      return null;
    }

    /**
     *  When order data is set, checkout mutation will automatically be called,
     *  because 'orderData' is added in useEffect as a dependency.
     */
    const checkoutData = createCheckoutData(input);
    setOrderData(checkoutData);
  };

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   * @param {bool} isShipping If this is false it means it is billing.
   * @param {bool} isBillingOrShipping If this is false means its standard input and not billing or shipping.
   *
   * @return {void}
   */
  const handleOnChange = async (
    event,
    isShipping = false,
    isBillingOrShipping = false
  ) => {
    const { target } = event || {};

    if ("createAccount" === target.name) {
      handleCreateAccount(input, setInput, target);
    } else if ("billingDifferentThanShipping" === target.name) {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        await handleShippingChange(target);
      } else {
        await handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
    }
  };

  const handleShippingChange = async (target) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheShippingStates,
      setIsFetchingShippingStates
    );
  };

  const handleBillingChange = async (target) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
    await setStatesForCountry(
      target,
      setTheBillingStates,
      setIsFetchingBillingStates
    );
  };

  useEffect(() => {
    if (orderData !== null && cart?.products) {
      async function fetch() {
        // if fillCart is completed successfully, it will
        // checkout automatically through onComplete
        await fillCart();
      }
      fetch();
    }
  }, [orderData]);

  return (
    <>
      {!cart && (
        <Heading as="h1" fontSize="md" fontWeight="medium">
          Δεν έχετε προιόντα στο καλάθι σας
        </Heading>
      )}
      {cart && (
        <form onSubmit={handleFormSubmit}>
          <Flex gap={8} flexDirection={{ base: "column", md: "row" }}>
            <Box flexGrow={1}>
              <Text
                textAlign={{ base: "center", md: "left" }}
                fontSize="xl"
                fontWeight="bold"
                //imitate remove button for large screens
                height="40px"
                mb={2}
              >
                Στοιχεία Παραγγελίας
              </Text>
              <PersonalInfoForm
                input={input?.shipping}
                handleOnChange={(event) => handleOnChange(event, true, true)}
                isFetchingStates={isFetchingShippingStates}
                isShipping
                isBillingOrShipping
              />
            </Box>

            {/* Order & Payments*/}
            <Stack flexBasis="60%" gap={4}>
              <CartItemsContainer />
              <Button
                colorScheme="yellow"
                isLoading={isOrderProcessing || fillCartLoading}
                type="submit"
                ml="auto"
              >
                Ολοκλήρωση Παραγγελίας
              </Button>
            </Stack>
          </Flex>
        </form>
      )}
      {/*	Show message if Order Success (for debug purposes)*/}
      {/* <OrderSuccess response={checkoutResponse} /> */}
    </>
  );
};

const createFillCartData = (cart) => {
  const items = cart.products.map((product) => ({
    productId: product.productId,
    quantity: product.qty,
  }));

  const clientMutationId = v4();

  return {
    items,
    clientMutationId,
  };
};

export default CheckoutForm;
