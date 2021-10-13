import { Slider, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import moment from "moment";

var index = 0;

const dateConfig = [
  {
    value: index++,
    label: "7 Tage",
    s: moment().subtract(7, "days"),
    e: moment(),
  },
  {
    value: index++,
    label: "30 Tage",
    s: moment().subtract(1, "month"),
    e: moment(),
  },
  {
    value: index++,
    label: "3 Monate",
    s: moment().subtract(3, "month"),
    e: moment(),
  },
  {
    value: index++,
    label: "aktuelles Jahr",
    s: moment().startOf("year"),
    e: moment(),
  },
  {
    value: index++,
    label: "letztes Jahr",
    s: moment().startOf("year").subtract(1, "years"),
    e: moment().startOf("year").subtract(1, "days"),
  },
  { value: index++, label: "alles" },
];

const FilterDate = observer(({ model }) => {
  const changeHandler = (event, i) => {
    model.update_dateConfigSelected(i, dateConfig[i].s, dateConfig[i].e);
  };

  return (
    <>
      <Typography variant="body2" style={{ paddingTop: "10px" }}>
        Zeitraum
      </Typography>
      <Slider
        color="secondary"
        defaultValue={dateConfig.length - 1}
        step={1}
        marks={dateConfig}
        min={0}
        max={dateConfig.length - 1}
        onChange={changeHandler}
        style={{ marginLeft: 25, paddingBottom: 30, maxWidth: "90%" }}
      />
    </>
  );
});

export default FilterDate;
