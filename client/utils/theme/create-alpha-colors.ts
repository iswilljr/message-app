type Colors = [string, string, string, string, string, string, string, string, string, string];

export const createAlphaColors = (color: string): Colors => {
  const alpha = (alpha: string) => `rgba(${color}, 0.${alpha})`;

  return ["04", "06", "08", "16", "24", "36", "48", "64", "80", "92"].map(alpha) as Colors;
};
