import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";

const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy",
};

export const formatDate = (date: string) => {
  return formatRelative(new Date(date), new Date(), {
    locale: {
      ...enUS,
      formatRelative: (token: keyof typeof formatRelativeLocale) => formatRelativeLocale[token],
    },
  });
};
