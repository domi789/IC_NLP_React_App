function collect_topics(data, minScore) {
  const topics = [];
  data
    .filter((f) => minScore === undefined || f["NA."] >= minScore)
    .forEach((element) => {
      const topic = element.topics;
      if (topics.includes(topic)) return;
      topics.push(topic);
    });
  return topics;
}

export function convert_to_nodes_cardItem(cardItem) {
  const data = [];
  cardItem.map((c) =>
    c.topics.forEach((t) => {
      data.push(t);
    })
  );

  return convert_to_nodes(data);
}

export function convert_to_nodes(data) {
  const minScore = 0.001;

  const topics = collect_topics(data, minScore);

  return topics.map((v, i) => {
    return {
      id: i,
      label: v,
      title: v,
      text_ids: collect_text_ids_for_topics(data, v),
      scores: collect_scores_for_topics(data, v),
    };
  });
}

function collect_text_ids_for_topics(data, topic) {
  return data.filter((v) => v.topics === topic).map((v) => v.texts_id);
}
function collect_scores_for_topics(data, topic) {
  return data.filter((v) => v.topics === topic).map((v) => v["NA."]);
}

export function collect_edges(nodes) {
  const edges = [];
  nodes.forEach((n1) => {
    n1.text_ids.forEach((t) => {
      nodes
        .filter((n2) => n2.text_ids.includes(t) && n1 !== n2)
        .forEach((n2) => {
          if (
            edges.filter(
              (e) =>
                (e.from === n1.id && e.to === n2.id) ||
                (e.from === n2.id && e.to === n1.id)
            ).length > 0
          )
            return;
          const edge = { from: n1.id, to: n2.id };
          edges.push(edge);
        });
    });
  });
  return edges;
}
