import { Grid } from "@chakra-ui/react";

const ProductGrid = ({ children }) => {
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
      gap={6}
      width="100%"
    >
      {children}
    </Grid>
  );
};

export default ProductGrid;
