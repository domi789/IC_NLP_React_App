import { Chip, InputBase, Typography } from "@material-ui/core";
import React from "react";
import { customStylesSearchBox } from "../css/MaterialUi_CSS";
import SearchIcon from "@material-ui/icons/Search";
import SelectTextCategory from "./SelectTextCategory";
import { observer } from "mobx-react-lite";
import ReadTimeBar from "./ReadTimeBar";

const SearchBox = observer(({ model }) => {
  const classes = customStylesSearchBox();

  const onSubmitHandler = (e) => {
    // prevents refresh of page if enter is pressed
    e.preventDefault();

    if (model.searchText) {
      model.add_searchText_to_searchArray();
    }
  };

  const deleteHandler = (val) => {
    model.remove_searchText_from_searchArray(val);
  };

  return (
    <div style={{ padding: 20 }}>
      <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
        {/* SEARCH INPUT */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            value={model.searchText}
            className={classes.inputInput}
            placeholder="Themen & Stichworte suchen"
            onChange={(e) => model.updateSearchText(e.target.value)}
          />
        </div>
        <div style={{ maxWidth: 340 }}>
          {model.searchArray.map((c, index) => (
            <Chip
              style={{ margin: 5 }}
              key={index}
              label={c}
              onDelete={() => deleteHandler(c)}
              color="secondary"
            />
          ))}
        </div>

        {/* THEMEN AUSWAHL / RADIO BUTTONS */}
        <SelectTextCategory model={model} />
      </form>
      <ReadTimeBar model={model} />
    </div>
  );
});

export default SearchBox;
