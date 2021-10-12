import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import { customStylesLayout } from "../css/MaterialUi_CSS";
import { format } from "date-fns";
import sgkb_logo from "../images/sgkb_rgb_pos.png";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { observer } from "mobx-react-lite";
import SelectTextCategory from "./SelectTextCategory";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Layout = observer(({ children, model }) => {
  const classes = customStylesLayout();

  const onSubmitHandler = (e) => {
    // prevents refresh of page if enter is pressed
    e.preventDefault();
    if (model.searchText) {
      model.split_searchText_to_searchArray();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <img src={sgkb_logo} alt="logo" className={classes.logo} />
          {/* SEARCH INPUT */}
          <div className={classes.title}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
                <InputBase
                  value={model.searchText}
                  className={classes.inputInput}
                  placeholder="Themen & Stichworte suchen"
                  onChange={(e) => model.updateSearchText(e.target.value)}
                  endAdornment={
                    <>
                      <IconButton
                        onClick={(e) =>
                          model.remove_searchText_from_searchInput()
                        }
                        size="small"
                      >
                        <ClearIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        disableFocusRipple
                        disableRipple
                        onClick={handleClick}
                      >
                        <Typography variant="body2">Kategorie</Typography>

                        {/* <ExpandMoreIcon /> */}
                      </IconButton>
                    </>
                  }
                />
              </form>
            </div>
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <form>
              <SelectTextCategory model={model} />
            </form>
            <Button onClick={handleClose} color="secondary">
              Ok
            </Button>
          </StyledMenu>

          <Typography className={classes.date}>
            {format(new Date(), "dd MMMM Y")}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.page}>{children}</div>
    </div>
  );
});

export default Layout;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #E3E3E3",
    padding: 10,
    paddingLeft: 15,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
