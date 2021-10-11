import { Box, Container, Grid, Paper } from "@material-ui/core";
import React from "react";
import CardItem from "./CardItem";
import { observer } from "mobx-react-lite";
import ReadTimeBar from "./ReadTimeBar";
import Masonry from "react-masonry-css";
import TopicsGraph from "./TopicsGraph";

const CardsBox = observer(({ model }) => {
  const cardInfos = model.cardInfos;

  const breakpoints = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box width="70%">
        <ReadTimeBar model={model} />
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column "
        >
          {cardInfos.map((c, i) => (
            <div key={i}>
              <CardItem cardInfos={c} />
            </div>
          ))}
        </Masonry>
      </Box>
      <Box width="30%">
        <TopicsGraph model={model} />
      </Box>
    </Box>
  );
});

export default CardsBox;
