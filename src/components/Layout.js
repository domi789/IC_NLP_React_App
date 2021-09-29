import React from "react";
import { AppBar, Drawer, Toolbar, Typography } from "@material-ui/core";
import { customStylesLayout } from "../css/MaterialUi_CSS";
import { format } from "date-fns";
import SearchBox from "./SearchBox";
import sgkb_logo from "../images/sgkb_rgb_pos.png";

const Layout = ({ children, model }) => {
  const classes = customStylesLayout();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed" elevation={0}>
        <Toolbar>
          <Typography variant="h5" align="left" className={classes.title}>
            IC Research Center
          </Typography>
          <Typography className={classes.date}>
            {format(new Date(), "dd MMMM Y")}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDE DRAWER fixed */}
      <Drawer className={classes.drawer} variant="permanent" anchor="left">
        <div className={classes.drawerPaper}>
          <img src={sgkb_logo} alt="logo" className={classes.logo} />
          <SearchBox model={model} />
        </div>
      </Drawer>

      <div className={classes.page}>{children}</div>
    </div>
  );
};

export default Layout;
