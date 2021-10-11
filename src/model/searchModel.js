import { makeAutoObservable } from "mobx";
import db from "../backend/jsons/db.js";
import { get_filtered_cardItemInfos } from "../functions/get_filtered_cardItemInfos";
import {
  get_all_ids_unpack_1x,
  get_unique_kind_id_name,
  updateCardItemInfos_AND,
} from "../functions/helper_functions.js";
import {
  collect_edges,
  convert_to_nodes,
  convert_to_nodes_cardItem,
} from "../functions/topic_network_functions";

class SearchModel {
  // class properties must have a default value
  // in order to be picked up by mobx:
  // https://mobx.js.org/observable-state.html#limitations
  searchText = "";
  searchArray = [];

  categories = get_unique_kind_id_name(db).map((k) => ({
    ...k,
    checked: true,
  }));

  cardInfos = get_filtered_cardItemInfos(
    db,
    get_all_ids_unpack_1x(db.texts, "id")
  );

  readTimeTotal = db.texts.reduce((acc, t) => acc + t.readtime, 0);
  readTimeSelection = this.cardInfos.reduce(
    (acc, c) => acc + c.texts[0].readtime,
    0
  );
  readTimeProzent = Math.round(
    (this.readTimeSelection / this.readTimeTotal) * 100
  );

  topicNodes = convert_to_nodes_cardItem(this.cardInfos);
  topicEdges = collect_edges(this.topicNodes);

  topicSelectedId = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  updateSearchText(newtext) {
    this.searchText = newtext;
  }

  updateSearchArray(newarray) {
    this.searchArray = newarray;
  }
  updateSelectedCategories(element) {
    this.categories[element.target.value - 1].checked = element.target.checked;
    this.updateCardItems();
    this.updateReadTimeSelection();
    this.update_topicNodes();
  }
  updateCardItems() {
    this.cardInfos = updateCardItemInfos_AND(
      db,
      this.categories,
      this.searchArray
    );
  }
  updateReadTimeSelection() {
    this.readTimeSelection = this.cardInfos.reduce(
      (acc, c) => acc + c.texts[0].readtime,
      0
    );
    this.updateReadTimeProzent();
  }
  updateReadTimeProzent() {
    this.readTimeProzent = Math.round(
      (this.readTimeSelection / this.readTimeTotal) * 100
    );
  }
  add_searchText_to_searchArray() {
    this.searchArray.push(this.searchText);
    this.updateSearchText("");
    this.updateCardItems();
    this.updateReadTimeSelection();
    this.update_topicNodes();
  }
  remove_searchText_from_searchArray(val) {
    this.searchArray = this.searchArray.filter((item) => item !== val);
    this.updateCardItems();
    this.updateReadTimeSelection();
    this.update_topicNodes();
  }
  split_searchText_to_searchArray() {
    this.searchArray = this.searchText
      .replace(",", "")
      .replace(";", "")
      .split(" ");
    this.updateCardItems();
    this.updateReadTimeSelection();
    this.update_topicNodes();
  }
  remove_searchText_from_searchInput() {
    this.updateSearchText("");
    this.updateSearchArray([]);
    this.updateCardItems();
    this.updateReadTimeSelection();
    this.update_topicNodes();
  }
  update_topicNodes() {
    this.topicNodes = convert_to_nodes_cardItem(this.cardInfos);
    this.update_topicEdges();
  }
  update_topicEdges() {
    this.topicEdges = collect_edges(this.topicNodes, 0.0001);
  }

  update_topicSelected(newTopicId) {
    this.topicSelected = newTopicId;
  }
}

export { SearchModel };
