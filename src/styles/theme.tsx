import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
    },

    primary: {
      main: "#3C4151",
      light: "#9EA0A8",
    },
    secondary: {
      main: green[500],
      light: "#9EA0A8",
    },
  },
  typography: {
    h6: {
      fontSize: 20,
      fontWeight: 600,
      fontFamily: "Inter"
    },
    body1: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "Inter"
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
      fontFamily: "Inter"
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Inter"
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      fontFamily: "Inter"
    },
    query: {
      fontFamily: "Ubuntu Mono"
    },
  },
});


declare module '@mui/material/styles' {
  interface TypographyVariants {
    query: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    query?: React.CSSProperties;
  }
}
