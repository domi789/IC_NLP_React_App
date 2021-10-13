import React from "react";
import { IconButton, InputBase } from "@material-ui/core";
import { customStylesLayout } from "../css/MaterialUi_CSS";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { observer } from "mobx-react-lite";

import FilterDropDown from "./FilterDropDown";

const SearchInput = observer(({ model }) => {
  const classes = customStylesLayout();

  const onSubmitHandler = (e) => {
    // prevents refresh of page if enter is pressed
    e.preventDefault();
    if (model.searchText) {
      model.split_searchText_to_searchArray();
    }
  };

  return (
    <>
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
                    onClick={(e) => model.remove_searchText_from_searchInput()}
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                  <FilterDropDown model={model} />
                </>
              }
            />
          </form>
        </div>
      </div>
    </>
  );
});

export default SearchInput;
