import { Container, Grid } from "@material-ui/core";
import React from "react";
import CardItem from "./CardItem";
import { observer } from "mobx-react-lite";
import ReadTimeBar from "./ReadTimeBar";

const CardsBox = observer(({ model }) => {
  const cardInfos = model.cardInfos;

  return (
    <Container maxWidth="md">
      <ReadTimeBar model={model} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {cardInfos.map((c, i) => (
            <div key={i}>
              <CardItem cardInfos={c} />
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
});

export default CardsBox;
