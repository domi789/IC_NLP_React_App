import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { customStylesCardItem } from "../css/MaterialUi_CSS";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import format from "date-fns/format";
import dailyFocus from "../images/Annotation.png";
import equityNotes from "../images/Setup.png";
import aktienTrends from "../images/aktienTrend.png";

const CardItem = ({ cardInfos }) => {
  const classes = customStylesCardItem({ cardInfos });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function showImg(i) {
    let imgResult;
    if (i === 1) {
      imgResult = dailyFocus;
    } else if (i === 2) {
      imgResult = aktienTrends;
    } else {
      imgResult = equityNotes;
    }
    return imgResult;
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={showImg(cardInfos.texts[0].kind_id)}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {cardInfos.texts[0].title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {format(new Date(cardInfos.texts[0].insert_dt), "dd MMMM Y")} |
            Lesezeit {cardInfos.texts[0].readtime} min
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {cardInfos.texts[0].teaser_text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickOpen}>
            mehr Infos
          </Button>
          <Button
            size="small"
            onClick={() =>
              window.open(
                "https://www.sgkb.ch/download/online/" +
                  cardInfos.texts[0].file_name.replace(".txt", "") +
                  ".pdf"
              )
            }
          >
            Lesen
          </Button>
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle onClose={handleClose}>
              {cardInfos.texts[0].title}
            </DialogTitle>
            <DialogContent dividers>
              <List variant="body2">
                <Typography variant="body2">SENTIMENTS:</Typography>
                {cardInfos.sentimentsTop.map((c, i) => (
                  <ListItem dense button key={i}>
                    <ListItemIcon>
                      <ThumbUpOutlinedIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText secondary={c.content} />
                  </ListItem>
                ))}
                {cardInfos.sentimentsFlop.map((c, i) => (
                  <ListItem dense button key={i}>
                    <ListItemIcon>
                      <ThumbDownOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText secondary={c.content} />
                  </ListItem>
                ))}
              </List>
              <List variant="body2">
                <Typography variant="body2">CATEGORIES:</Typography>
                {cardInfos.categories.map((c, i) => (
                  <ul key={i}>
                    <li>{c.label.replace("/", "").replace(/\//g, ", ")}</li>
                  </ul>
                ))}
              </List>
              <List variant="body2">
                <Typography variant="body2">CONCEPTS:</Typography>
                {cardInfos.concepts.map((c, i) => (
                  <ul key={i}>
                    <li>{c.text}</li>
                  </ul>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CLOSE</Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </div>
    </Card>
  );
};

export default CardItem;
