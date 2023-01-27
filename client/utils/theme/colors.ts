import type { MantineThemeColorsOverride } from "@mantine/core";
import { createAlphaColors } from "./create-alpha-colors";

export const colors: MantineThemeColorsOverride = {
  white: createAlphaColors("255, 255, 255"),
  black: createAlphaColors("0, 0, 0"),
  green: ["#F0FFF4", "#C6F6D5", "#9AE6B4", "#68D391", "#48BB78", "#38A169", "#2F855A", "#276749", "#22543D", "#1C4532"],
  red: ["#FFF5F5", "#FED7D7", "#FEB2B2", "#FC8181", "#F56565", "#E53E3E", "#C53030", "#9B2C2C", "#822727", "#63171B"],
};
