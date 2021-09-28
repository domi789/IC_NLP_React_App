import { createTheme } from "@material-ui/core";
import { blue, green, pink, red, yellow } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      light: "#F6F6F6",
      dark: "#008751",
    },
    secondary: {
      main: "#008751",
    },
  },
});
export { theme };

const useStylesItemCards = makeStyles({
  root: {
    minWidth: 273,
    margin: "15px",
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
});
export { useStylesItemCards };

const customStylesLayout = makeStyles({
  root: {
    display: "flex",
  },
  page: {
    background: "#F9F9F9",
    width: "100%",
    marginTop: "60px" /* Bessere Lösung für Drop?? */,
  },
  logo: {
    maxWidth: 160,
    padding: 20,
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  date: {
    fontSize: "12px",
  },
  drawer: {
    width: 280,
  },
  appbar: {
    // width: `calc(100% - 280px)`,
    paddingLeft: 300,
  },
});
export { customStylesLayout };

const customStylesMain = makeStyles({
  page: {
    minWidth: "300px",
  },
});
export { customStylesMain };

const customStylesSearchBox = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    maxWidth: 240,
  },
  paper: {
    padding: "16px",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f9f9f9",
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    margin: 0,
    width: "100%",
  },
  searchIcon: {
    paddingLeft: "10px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  // chipactive: {
  //   margin: 5,
  //   backgroundColor: "green",
  // },
  // chip: {
  //   margin: 5,
  //   backgroundColor: "grey",
  // },
});
export { customStylesSearchBox };

const customStylesCardItem = makeStyles({
  avatar: {
    background: ({ cardInfos }) => {
      if (cardInfos.texts[0].kind_id === 1) {
        return yellow[700];
      }
      if (cardInfos.texts[0].kind_id === 2) {
        return blue[500];
      }
      if (cardInfos.texts[0].kind_id === 3) {
        return green[500];
      }
      if (cardInfos.texts[0].kind_id === 4) {
        return pink[500];
      }
      if (cardInfos.texts[0].kind_id === 5) {
        return red[500];
      }
    },
  },
});
export { customStylesCardItem };
