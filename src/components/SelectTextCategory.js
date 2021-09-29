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

  return (
    <div className={classes.field}>
      <Typography variant="body1" gutterBottom>
        Text Kategories
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
    </div>
  );
});

export default SelectTextCategory;
