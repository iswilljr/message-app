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
    blue: [
      "#EBF8FF",
      "#BEE3F8",
      "#90CDF4",
      "#63B3ED",
      "#4299E1",
      "#3182CE",
      "#2B6CB0",
      "#2C5282",
      "#2A4365",
      "#1A365D",
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
  other: {
    space: {
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
    },
  },
};
