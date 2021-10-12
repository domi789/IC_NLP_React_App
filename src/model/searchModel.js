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

  get topicNodes() {
    return convert_to_nodes_cardItem(this.cardInfos);
  }
  get topicEdges() {
    return collect_edges(this.topicNodes);
  }

  // need to use same spelling as in update_topicSelected()-function below
  topicSelected = [];

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
  }
  remove_searchText_from_searchArray(val) {
    this.searchArray = this.searchArray.filter((item) => item !== val);
    this.updateCardItems();
    this.updateReadTimeSelection();
  }
  split_searchText_to_searchArray() {
    this.searchArray = this.searchText
      .replace(",", "")
      .replace(";", "")
      .split(" ");
    this.updateCardItems();
    this.updateReadTimeSelection();
  }
  remove_searchText_from_searchInput() {
    this.updateSearchText("");
    this.updateSearchArray([]);
    this.updateCardItems();
    this.updateReadTimeSelection();
  }

  update_topicSelected(newTopicId) {
    // nodes: array of the selected ids
    this.topicSelected = newTopicId;
  }
}

export { SearchModel };
