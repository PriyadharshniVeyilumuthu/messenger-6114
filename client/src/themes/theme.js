import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: "#b0b0b0",
        "&$focused": {
          color: "#b0b0b0",
        },
        "&$animated": {
          fontSize: "20px",
        }
      }
    },
    MuiInput: {
      root: {
        paddingTop: "13px",
      },
      underline: {
        "&&::before": {
          borderColor: "#D5DFEE"
        }
      },
      input: {
        fontSize: "1em",
        width: '21em',
        marginTop: '10px'
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  }
});
