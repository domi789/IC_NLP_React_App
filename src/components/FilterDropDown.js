import React from "react";
import {
  Button,
  Divider,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import SelectTextCategory from "./SelectTextCategory";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterDate from "./FilterDate";

const FilterDropDown = observer(({ model }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        disableFocusRipple
        disableRipple
        onClick={handleClick}
        variant="body2"
      >
        <Typography>Filter</Typography>

        {/* <ExpandMoreIcon /> */}
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <SelectTextCategory model={model} />
        <Divider style={{ margin: "5px" }} />
        <FilterDate model={model} />
        <Divider style={{ margin: "5px" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleClose} color="secondary">
            Ok
          </Button>
        </div>
      </StyledMenu>
    </>
  );
});

export default FilterDropDown;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #E3E3E3",
    padding: 10,
    paddingLeft: 15,
    width: 600,
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
      horizontal: "right",
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
