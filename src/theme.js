import { extendTheme } from "@chakra-ui/react";
import { inputTheme } from "./styles/inputTheme";
import { menuTheme } from "./styles/menuTheme";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const components = {
  Menu: menuTheme,
  Input: inputTheme,
};

export const theme = extendTheme({ colors: colors, components: components });
