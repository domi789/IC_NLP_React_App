import { Box, Divider, Paper, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React from "react";
import Graph from "react-graph-vis";

const options = {
  layout: {
    hierarchical: false,
    improvedLayout: true,
    clusterThreshold: 150,
  },
  locale: "de",
  nodes: {
    borderWidth: 1,
    borderWidthSelected: 2,
    chosen: true,
    color: {
      border: "#008751",
      background: "#E3E3E3",
      highlight: {
        border: "#008751",
        background: "#D1EEA2",
      },
      hover: {
        border: "#008751",
        background: "#D1EEA2",
      },
    },
    opacity: 1,
    font: {
      color: "#5F5F5F",
      size: 12, // px
    },
    labelHighlightBold: true,
    shape: "ellipse",
    size: 25,
  },
  edges: {
    color: {
      color: "#BABABA",
      highlight: "#5F5F5F",
      hover: "#5F5F5F",
      inherit: "from",
    },
    arrows: {
      to: {
        enabled: false,
      },
    },
  },
  height: "400px",
  physics: {
    enabled: false,
  },
};

const TopicsGraph = observer(({ model }) => {
  const graph = {
    nodes: model.topicNodes,
    edges: model.topicEdges,
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
      model.update_topicSelected(nodes);
      console.log("selected " + nodes);
      console.log("selected " + model.topicSelected);
    },
  };

  return (
    <Paper
      style={{
        marginTop: "65px",
        marginLeft: "30px",
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      <Typography
        variant="h6"
        color="textSecondary"
        style={{
          paddingLeft: "10px",
        }}
      >
        Topic Netzwerk
      </Typography>
      <Divider style={{ margin: "10px" }} />
      <Graph
        graph={graph}
        options={options}
        events={events}
        // getNetwork={(network) => {}}
        style={{ margin: "10px" }}
      />
    </Paper>
  );
});

export default TopicsGraph;