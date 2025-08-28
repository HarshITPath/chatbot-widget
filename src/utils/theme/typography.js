// typography.js
export const typography = (theme) => {
  return {
    fontFamily: [
      "sans-serif",
    ].join(","),

    allVariants: {
      overflowWrap: "break-word",
    },

    h1: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.75rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.5rem",
      },
    },

    h2: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.75rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.5rem",
      },
    },

    h3: {},

    h4: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.9rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2.125rem",
      },
    },

    h5: {},
    h6: {},

    body1: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.25rem",
      },
    },

    body2: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem",
      },
    },

    subtitle1: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      [theme.breakpoints.up("xs")]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1rem",
      },
    },

    subtitle2: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "0.75rem", //12px
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "0.75rem", //12px
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "0.875rem", //14px
      },
    },
  };
};
