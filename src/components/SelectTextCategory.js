import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import { customStylesSearchBox } from "../css/MaterialUi_CSS";

const SelectTextCategory = observer(({ model }) => {
  const classes = customStylesSearchBox();

  const onChangeHandler = (e) => {
    model.updateSelectedCategories(e);
  };

  // const handleClick = (e) => () => {
  //   console.log(e);
  //   let newCategories = [...categories];
  //   newCategories[e.kind_id - 1].checked = !e.checked;
  //   setCategories(newCategories);
  //   model.updateSelectedCategories(newCategories);
  //   console.log(newCategories);
  // };

  return (
    <div className={classes.field}>
      <Typography variant="body2" gutterBottom>
        nach Text Kategorie
      </Typography>
      <FormGroup>
        {model.categories.map((c) => (
          <FormControlLabel
            key={c.kind_id}
            control={
              <Checkbox
                value={c.kind_id}
                checked={c.checked}
                name={c.kind_name}
                onChange={onChangeHandler}
                size="small"
              />
            }
            label={c.kind_name}
          />
        ))}
      </FormGroup>
      {/* {categories.map((c) => (
        <Chip
          className={c.checked ? classes.chipactive : classes.chip}
          key={c.kind_id}
          label={c.kind_name}
          onClick={handleClick(c)}
        />
      ))} */}
    </div>
  );
});

export default SelectTextCategory;
