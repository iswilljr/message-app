import { CSSObject, MantineTheme, MantineThemeOverride } from "@mantine/core";

const createAlphaColors = (
  color: string
): [string, string, string, string, string, string, string, string, string, string] => {
  const alpha = (alpha: string) => `rgba(${color}, ${alpha})`;

  return [
    alpha("0.04"),
    alpha("0.06"),
    alpha("0.08"),
    alpha("0.16"),
    alpha("0.24"),
    alpha("0.36"),
    alpha("0.48"),
    alpha("0.64"),
    alpha("0.80"),
    alpha("0.92"),
  ];
};

export const theme: MantineThemeOverride = {
  globalStyles: (theme) => ({ ul: { listStyle: "none" } }),
  colorScheme: "dark",
  primaryColor: "white",
  focusRing: "never",
  colors: {
    white: createAlphaColors("255, 255, 255"),
    black: createAlphaColors("0, 0, 0"),
    green: [
      "#F0FFF4",
      "#C6F6D5",
      "#9AE6B4",
      "#68D391",
      "#48BB78",
      "#38A169",
      "#2F855A",
      "#276749",
      "#22543D",
      "#1C4532",
    ],
    red: ["#FFF5F5", "#FED7D7", "#FEB2B2", "#FC8181", "#F56565", "#E53E3E", "#C53030", "#9B2C2C", "#822727", "#63171B"],
  },
  components: {
    Button: {
      defaultProps: {
        bg: "white.3",
        sx: (theme: MantineTheme): CSSObject => ({
          ":hover": { backgroundColor: theme.colors.white[4] },
          ":disabled": { backgroundColor: theme.colors.white[2], cursor: "not-allowed", color: theme.colors.white[5] },
        }),
      },
    },
    List: {
      defaultProps: {
        w: "100%",
        styles: { itemWrapper: { width: "100%" } },
      },
    },
    Avatar: {
      defaultProps: {
        styles: {
          placeholder: { backgroundColor: "transparent" },
          placeholderIcon: { width: "100%", height: "100%" },
        },
      },
    },
    ActionIcon: {
      defaultProps: {
        bg: "white.3",
        sx: (theme: MantineTheme): CSSObject => ({
          ":hover": { backgroundColor: theme.colors.white[4] },
          ":disabled": { backgroundColor: theme.colors.white[2], cursor: "not-allowed", color: theme.colors.white[5] },
        }),
      },
    },
    Input: {
      defaultProps: {
        styles: {
          input: {
            minHeight: 34,
            height: 34,
            ":focus": {
              borderColor: "var(--mantine-color-white-6)",
            },
            ":hover": {
              borderColor: "var(--mantine-color-white-5)",
            },
          },
        },
      },
    },
  },
};
