import { Box, Container, Grid, Paper } from "@material-ui/core";
import React from "react";
import CardItem from "./CardItem";
import { observer } from "mobx-react-lite";
import ReadTimeBar from "./ReadTimeBar";
import Masonry from "react-masonry-css";
import TopicsGraph from "./TopicsGraph";

function filter_selected_Node(model) {
  console.log(typeof model.topicSelectedId);
  if (model.topicSelectedId.length === 0) return model.cardInfos;
  console.log("under if");
  // find text ids from seleced node
  const text_ids = [];
  model.topicSelectedId.forEach((t) => {
    const ids = model.topicNodes.find((n) => n.id === model.topicSelectedId);
    text_ids = text_ids.concat(ids);
  });

  // filter cardInfos with text ids
  return model.cardInfos.filter((c) => text_ids.includes(c.texts[0].id));
}

const CardsBox = observer(({ model }) => {
  // const cardInfos = model.cardInfos;

  const breakpoints = {
    default: 3,
    1600: 2,
    1100: 1,
  };

  const cards = filter_selected_Node(model);

  return (
    <Box display="flex" justifyContent="center">
      <Box width="70%">
        <ReadTimeBar model={model} />
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column "
        >
          {cards.map((c, i) => (
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
