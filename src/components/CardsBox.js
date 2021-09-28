import { Container } from "@material-ui/core";
import React from "react";
import CardItem from "./CardItem";
import Masonry from "react-masonry-css";
import { observer } from "mobx-react-lite";

const CardsBox = observer(({ model }) => {
  const cardInfos = model.cardInfos;

  const breakpoints = {
    default: 3,
    1400: 2,
    980: 1,
  };
  return (
    <Container>
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
    </Container>
  );
});

export default CardsBox;
