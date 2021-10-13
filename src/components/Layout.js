import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { customStylesLayout } from "../css/MaterialUi_CSS";
import { format } from "date-fns";
import sgkb_logo from "../images/sgkb_rgb_pos.png";
import { observer } from "mobx-react-lite";
import SearchInput from "./SearchInput";

const Layout = observer(({ children, model }) => {
  const classes = customStylesLayout();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <img src={sgkb_logo} alt="logo" className={classes.logo} />
          {/* SEARCH INPUT */}
          <SearchInput model={model} style={{ flexGrow: 1 }} />
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
