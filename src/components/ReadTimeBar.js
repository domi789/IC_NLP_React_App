import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";

const ReadTimeBar = observer(({ model }) => {
  return (
    <div style={{ paddingBottom: 20 }}>
      <Typography variant="body1" gutterBottom>
        Lesezeit Selektion: {model.readTimeSelection} Minuten
      </Typography>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress
            style={{ height: 16 }}
            variant="determinate"
            value={model.readTimeProzent}
            color="secondary"
          />
        </Box>
      </Box>
    </div>
  );
});

export default ReadTimeBar;
