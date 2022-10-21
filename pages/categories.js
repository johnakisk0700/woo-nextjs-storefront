import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import GET_CATEGORIES_QUERY from "../src/queries/get-categories";

export default function Categories(props) {
  const { productCategories } = props;
  return (
    <>
      {/*Categories*/}
      <>
        <>Categories</>
      </>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CATEGORIES_QUERY,
  });
  return {
    props: {
      productCategories: data?.productCategories?.nodes || [],
    },
    revalidate: 1,
  };
}
