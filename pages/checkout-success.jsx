import {
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Image from "next/image";
import GET_LAST_ORDER from "../src/queries/get-last-order";
import client from "../src/components/ApolloClient";

export default function CheckoutSuccess() {
  // this is what i thought was ok at the time
  // cuz i was bored to create a provider, dont judge
  const [orderDetails, setOrderDetails] = useState();
  useEffect(() => {
    const orderDetails = JSON.parse(localStorage.getItem("last-order-details"));
    setOrderDetails(orderDetails);
    // localStorage.removeItem("last-order-details");
    const fetchLastOrder = async () => {
      const { data } = await client.query({
        query: GET_LAST_ORDER,
      });
      console.log(data);
    };
    fetchLastOrder();
  }, []);

  const tableColorScheme = useColorModeValue("blackAlpha", "whiteAlpha");
  const tableBorderColor = useColorModeValue(
    "blackAlpha.300",
    "whiteAlpha.600"
  );
  return (
    <Stack alignItems="center">
      <Heading as="h1" textAlign="center" mb={6}>
        H Παραγγελία σας ήταν{" "}
        <Text as="span" color="green.500">
          επιτυχής
        </Text>
        !
      </Heading>
      <Container maxWidth="2xl">
        <TableContainer
          {...styles.tableContainer}
          borderColor={tableBorderColor}
          mb={4}
        >
          <Table variant="simple" colorScheme={tableColorScheme}>
            <Thead>
              <Tr>
                <Th>Στοιχεία</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderDetails &&
                Object.entries(orderDetails.billing).map(
                  ([key, value]) =>
                    billingGreekMap[key] && (
                      <Tr>
                        <Td fontSize="sm">{billingGreekMap[key]}</Td>
                        <Td isNumeric fontWeight="bold">
                          {value}
                        </Td>
                      </Tr>
                    )
                )}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
        <TableContainer
          {...styles.tableContainer}
          borderColor={tableBorderColor}
        >
          <Table variant="simple" colorScheme={tableColorScheme}>
            <Thead>
              <Tr>
                <Th>Προιόν</Th>
                <Th isNumeric>Ποσότητα</Th>
                <Th isNumeric>Τιμή</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderDetails &&
                orderDetails.products.map((product) => (
                  <Tr>
                    <Td display="flex" alignItems="center" gap={4}>
                      <Image
                        src={product.image.sourceUrl}
                        width="64px"
                        height="64px"
                        objectFit="cover"
                      />
                      <Text
                        maxWidth="200px"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {product.name}
                      </Text>
                    </Td>
                    <Td isNumeric fontSize="sm">
                      x{product.qty}
                    </Td>
                    <Td isNumeric fontWeight="bold">
                      {product.totalPrice}€
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>

        <Text {...styles.totalsText}>
          ΦΠΑ:{" "}
          <Text as="span" fontWeight="medium" fontSize="lg" ml={4}>
            {orderDetails &&
              (orderDetails.totalProductsPrice * 0.24).toFixed(2)}
            €
          </Text>
        </Text>
        <Text {...styles.totalsText}>
          Σύνολο χωρις ΦΠΑ:{" "}
          <Text as="span" fontWeight="medium" fontSize="lg" ml={4}>
            {orderDetails &&
              (
                orderDetails.totalProductsPrice -
                orderDetails.totalProductsPrice * 0.24
              ).toFixed(2)}
            €
          </Text>
        </Text>
        <Text {...styles.totalsText}>
          Σύνολο:{" "}
          <Text as="span" fontWeight="bold" fontSize="2xl" ml={4}>
            {orderDetails && orderDetails.totalProductsPrice.toFixed(2)}€
          </Text>
        </Text>
      </Container>
    </Stack>
  );
}

const billingGreekMap = {
  firstName: "Όνοματεπώνυμο",
  lastName: "Κουδούνι",
  phone: "Τηλέφωνο",
  postcode: "Τ.Κ.",
};

const styles = {
  tableContainer: {
    borderRadius: 6,
    border: "1px solid",
  },
  totalsText: {
    mt: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
