const { gql } = require("@apollo/client");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const config = dotenv.config();
const fs = require("fs");

async function makeNavbar() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query {
    productCategories(where: { parent: 0 }) {
      nodes {
        name
        slug
        children {
          nodes {
            name
            slug
          }
        }
      }
    }
  }`,
    }),
  });

  const data = await res.json();
  const categories = data.data.productCategories.nodes;
  const formattedCategories = categories.map((category) => ({
    name: category.name,
    children: category.children.nodes,
  }));
  fs.writeFileSync(
    "src/navbarLinks.js",
    `export const navbarLinks = ${JSON.stringify(formattedCategories)}`
  );
}

makeNavbar();
