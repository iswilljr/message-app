import type {
  ActionIconProps,
  AvatarProps,
  ButtonProps,
  CSSObject,
  InputProps,
  ListProps,
  MantineTheme,
} from "@mantine/core";

type MantineThemeComponents = Record<string, { defaultProps: Record<string, any> }>;

const buttonDefaultProps: Partial<ButtonProps> = {
  bg: "white.3",
  sx: (theme) => ({
    ":hover": { backgroundColor: theme.colors.white[4] },
    ":disabled": { backgroundColor: theme.colors.white[2], cursor: "not-allowed", color: theme.colors.white[5] },
    [theme.fn.smallerThan(800)]: {},
  }),
};

const listDefaultProps: Partial<ListProps> = {
  w: "100%",
  styles: { itemWrapper: { width: "100%" } },
};

const avatarDefaultProps: Partial<AvatarProps> = {
  styles: {
    placeholder: { backgroundColor: "transparent" },
    placeholderIcon: { width: "100%", height: "100%" },
  },
};

const actionIconDefaultProps: Partial<ActionIconProps> = {
  bg: "white.3",
  sx: (theme: MantineTheme): CSSObject => ({
    ":hover": { backgroundColor: theme.colors.white[4] },
    ":disabled": { backgroundColor: theme.colors.white[2], cursor: "not-allowed", color: theme.colors.white[5] },
  }),
};

const inputDefaultProps: Partial<InputProps> = {
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
};

export const components: MantineThemeComponents = {
  Button: { defaultProps: buttonDefaultProps },
  List: { defaultProps: listDefaultProps },
  Avatar: { defaultProps: avatarDefaultProps },
  ActionIcon: { defaultProps: actionIconDefaultProps },
  Input: { defaultProps: inputDefaultProps },
};
