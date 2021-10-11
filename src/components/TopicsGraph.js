import { observer } from "mobx-react-lite";
import React from "react";
import Graph from "react-graph-vis";

// const graph = {
//   nodes: [
//     {
//       id: 1,
//       label: "Node 1",
//       title: "node 1 tootip text",
//       level: 2,
//     },
//     {
//       id: 2,
//       label: "Node 2",
//       title: "node 2 tootip text",
//       level: 1,
//     },
//     {
//       id: 3,
//       label: "Node 3",
//       title: "node 3 tootip text",
//       level: 3,
//       shape: "circle",
//       color: {
//         border: "#E3E3E3",
//         background: "#F6F6F6",
//         highlight: {
//           border: "#E3E3E3",
//           background: "#F6F6F6",
//         },
//       },
//       font: "0px",
//     },
//     {
//       id: 4,
//       label: "Node 4",
//       title: "node 4 tootip text",
//       level: 2,
//     },
//     {
//       id: 5,
//       label: "Node 5",
//       title: "node 5 tootip text",
//       level: 2,
//     },
//   ],
//   edges: [
//     { from: 1, to: 2 },
//     { from: 1, to: 3 },
//     { from: 2, to: 4 },
//     { from: 2, to: 5 },
//   ],
// };

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
  height: "500px",
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
      console.log("selected " + model.topicSelected);
    },
  };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {}}
    />
  );
});

export default TopicsGraph;
