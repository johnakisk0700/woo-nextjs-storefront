import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // // define the part you're going to style
  field: {
    py: 7,
    paddingLeft: 14,
    background: "white",
    _dark: { background: "gray.600" },
    _disabled: {
      opacity: 1,
      background: "blackAlpha.50",
      color: "gray.600",
      _dark: {
        background: "gray.900",
      },
    },
    _invalid: {
      border: "1px solid",
    },
  },
  addon: {
    background: "white",
    _dark: { background: "gray.600" },
  },
  element: {
    py: 6,
    mt: 1,
    borderRadius: 4,
    background: "white",
    _dark: { background: "gray.600" },
    _disabled: {
      opacity: 1,
      background: "transparent",
      _dark: {
        bg: "transparent",
      },
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    variant: null,
  },
});
