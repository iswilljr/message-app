import type { MantineThemeOverride } from "@mantine/core";
import { colors } from "./colors";
import { components } from "./components";
import { globalStyles } from "./global-styles";

export const theme: MantineThemeOverride = {
  globalStyles,
  colorScheme: "dark",
  primaryColor: "white",
  focusRing: "never",
  colors,
  components,
};
