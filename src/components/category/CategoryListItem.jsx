import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CategoryListItem = (props) => {
  const { category, selected } = props;
  const { name, slug } = category;
  return (
    <Link href={slug}>
      <Heading
        as="h1"
        fontSize="md"
        mb={4}
        fontWeight={selected && "black"}
        cursor="pointer"
      >
        {selected && "-"} {name}
      </Heading>
    </Link>
  );
};

export default CategoryListItem;
