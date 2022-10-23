const { gql } = require("@apollo/client");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const config = dotenv.config();
const fs = require("fs");
const http = require("http");

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
        image {
          sourceUrl(size: LARGE)
        }
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
    slug: category.slug,
    img: category.image?.sourceUrl ?? null,
    children: category.children.nodes,
  }));
  fs.writeFileSync(
    "src/navbarLinks.js",
    `export const navbarLinks = ${JSON.stringify(formattedCategories)}`
  );

  formattedCategories.forEach((cat) => {
    if (cat.img) {
      createSvgFile(cat.img, cat.slug);
    }
  });
}

const createSvgFile = (imgUrl, slug) => {
  const file = fs.createWriteStream(`public/${slug}.svg`);
  const request = http.get(imgUrl, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  });
};

makeNavbar();
