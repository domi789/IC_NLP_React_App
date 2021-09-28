import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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

const CardItem = ({ cardInfos }) => {
  const classes = customStylesCardItem({ cardInfos });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {cardInfos.texts[0].kind_name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <Typography variant="body1" color="textSecondary">
              {cardInfos.texts[0].readtime + " min"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lesezeit
            </Typography>
          </>
        }
        title={cardInfos.texts[0].title}
        subheader={format(new Date(cardInfos.texts[0].insert_dt), "dd MMMM Y")}
      />
      <Divider />
      <CardContent>
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
        {/* </a> */}
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
    </Card>
  );
};

export default CardItem;
