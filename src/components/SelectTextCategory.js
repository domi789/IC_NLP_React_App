import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";

const SelectTextCategory = observer(({ model }) => {
  const onChangeHandler = (e) => {
    model.updateSelectedCategories(e);
  };

  return (
    <>
      <Typography variant="body2">Kategorien</Typography>
      <FormGroup row>
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
            label={<Typography variant="body2">{c.kind_name}</Typography>}
          />
        ))}
      </FormGroup>
    </>
  );
});

export default SelectTextCategory;
