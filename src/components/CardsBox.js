import { Box } from "@material-ui/core";
import React from "react";
import CardItem from "./CardItem";
import { observer } from "mobx-react-lite";
import ReadTimeBar from "./ReadTimeBar";
import Masonry from "react-masonry-css";
import TopicsGraph from "./TopicsGraph";
import FilterDate from "./FilterDate";

function filter_selected_Node(model) {
  // typo in the model: model.topicSelected (instead of model.topicSelectedId)
  if (model.topicSelected.length === 0) return model.filteredCardInfos;
  // find text ids from selected node
  var text_ids = []; // <- must be var (we change it below)
  model.topicSelected.forEach((t) => {
    // we get the node back ...
    const node = model.topicNodes.find((n) => n.id === t);
    // ... and need to unwrap the text_ids property
    text_ids = text_ids.concat(node.text_ids);
  });

  // filter cardInfos with text ids
  return model.filteredCardInfos.filter((c) =>
    text_ids.includes(c.texts[0].id)
  );
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
        {/* <FilterDate model={model} /> */}
      </Box>
    </Box>
  );
});

export default CardsBox;
