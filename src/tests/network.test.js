import db from "../backend/jsons/test_db";
import {
  get_unique_kind_id_name,
  updateCardItemInfos_AND,
} from "../functions/helper_functions";
import {
  collect_edges,
  collect_topics,
  convert_to_nodes,
} from "../functions/topic_network_functions";

describe("Network", () => {
  test("Topics", () => {
    // ARANGE
    // Prepare categories
    const categories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));

    // prepare searchArray
    const topicSelectedId = 4;
    const searchText = "Corona";
    const searchArray = searchText.replace(",", "").replace(";", "").split(" ");

    // Act
    const cardInfos = updateCardItemInfos_AND(db, categories, searchArray);
    const nodes = convert_to_nodes(cardInfos);
    const edges = collect_edges(nodes);

    // ACT
    console.log(nodes);
    console.log(edges);

    // ASSERT
    // expect(nodes.length).toBe(50);
  });
});
