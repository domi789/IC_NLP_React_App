import React from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { customStylesLayout } from "../css/MaterialUi_CSS";
import { format } from "date-fns";
import sgkb_logo from "../images/sgkb_rgb_pos.png";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { observer } from "mobx-react-lite";
import SelectTextCategory from "./SelectTextCategory";

const Layout = observer(({ children, model }) => {
  const classes = customStylesLayout();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = (e) => {
    // prevents refresh of page if enter is pressed
    e.preventDefault();
    if (model.searchText) {
      model.split_searchText_to_searchArray();
    }
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
                        onClick={handleClickOpen}
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
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <form>
                <SelectTextCategory model={model} />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
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
