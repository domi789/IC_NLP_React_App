import db from "../backend/jsons/test_db";
import {
  get_all_ids_unpack_2x,
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

    // Act
    const nodes = convert_to_nodes(db.topics);
    const edges = collect_edges(nodes);

    // ACT
    console.log(nodes);
    console.log(edges);

    // ASSERT
    expect(nodes.length).toBe(19);
  });
  test("Topics", () => {
    // ARANGE
    // Prepare categories
    const categories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));

    // prepare searchArray
    const searchText = "Corona";
    const searchArray = searchText.replace(",", "").replace(";", "").split(" ");

    // Act
    const cardInfos = updateCardItemInfos_AND(db, categories, searchArray);
    const allNodes = convert_to_nodes(db.topics);
    const allTextIds = get_all_ids_unpack_2x(cardInfos, "topics", "texts_id");

    // const nodes = allNodes.filter((n) =>
    //   n.text_ids.forEach((e) => allTextIds.includes(e.text_ids))
    // );

    // ACT
    console.log(allNodes);
    // console.log(nodes);
    // console.log(edges);

    // ASSERT
    // expect(nodes.length).toBe(50);
  });
});
