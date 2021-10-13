import { makeAutoObservable } from "mobx";
import moment from "moment";
import db from "../backend/jsons/db.js";
import { get_filtered_cardItemInfos } from "../functions/get_filtered_cardItemInfos";
import {
  get_all_ids_unpack_1x,
  get_unique_kind_id_name,
  updateCardItemInfos_AND,
} from "../functions/helper_functions.js";
import {
  collect_edges,
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
  get readTimeSelection() {
    return this.filteredCardInfos.reduce(
      (acc, c) => acc + c.texts[0].readtime,
      0
    );
  }

  get readTimeProzent() {
    return Math.round((this.readTimeSelection / this.readTimeTotal) * 100);
  }

  get topicNodes() {
    return convert_to_nodes_cardItem(this.filteredCardInfos);
  }
  get topicEdges() {
    return collect_edges(this.topicNodes);
  }

  get filteredCardInfos() {
    return this.cardInfos.filter((c) => {
      const d = moment(c.texts[0].insert_dt);
      const s = this.dateConfigStart;
      const e = this.dateConfigEnd;
      return (s === undefined && e === undefined) || (s <= d && e >= d);
    });
  }

  // need to use same spelling as in update_topicSelected()-function below
  topicSelected = [];

  dateConfigSelected = 0;
  dateConfigStart = undefined;
  dateConfigEnd = undefined;

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
  }
  updateCardItems() {
    this.cardInfos = updateCardItemInfos_AND(
      db,
      this.categories,
      this.searchArray
    );
  }
  add_searchText_to_searchArray() {
    this.searchArray.push(this.searchText);
    this.updateSearchText("");
    this.updateCardItems();
  }
  remove_searchText_from_searchArray(val) {
    this.searchArray = this.searchArray.filter((item) => item !== val);
    this.updateCardItems();
  }
  split_searchText_to_searchArray() {
    this.searchArray = this.searchText
      .replace(",", "")
      .replace(";", "")
      .split(" ");
    this.updateCardItems();
  }
  remove_searchText_from_searchInput() {
    this.updateSearchText("");
    this.updateSearchArray([]);
    this.updateCardItems();
  }

  update_topicSelected(newTopicId) {
    // nodes: is an array of the selected ids
    this.topicSelected = newTopicId;
  }

  update_dateConfigSelected(i, s, e) {
    this.dateConfigSelected = i;
    this.dateConfigStart = s;
    this.dateConfigEnd = e;
  }
}

export { SearchModel };
