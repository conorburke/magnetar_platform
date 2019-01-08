import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    mobile: {
      primary: "#e4000f",
      secondary: "#dcdcdc"
    },
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

export default theme;
