import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { componentsStyle } from "./component-style";

const defaultTheme = createTheme({
  shape: {
    borderRadius: 6,
  },
  palette,
});

const theme = createTheme({
  ...defaultTheme,
  typography: typography(defaultTheme),
  components: componentsStyle(defaultTheme),
});

export default theme;
