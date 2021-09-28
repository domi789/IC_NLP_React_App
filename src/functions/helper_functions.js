/* Verschiedene Functions zum Filtern der IC Texte */
// import db from "../backend/jsons/db";

import { get_filtered_cardItemInfos } from "./get_filtered_cardItemInfos";
import { search_word_in_text } from "./search_word_in_text";

function get_unique_kind_id_name(db) {
  /*spezific function */
  /* da kind_id = object id wird bereits vorhandener eintrag überschrieben --> output wird unique */
  const unique_kind = db.texts.reduce(
    (pv, cv) => (
      (pv[cv.kind_id] = {
        kind_id: cv.kind_id,
        kind_name: cv.kind_name,
      }),
      pv
    ),
    {} /*start with empty array*/
  );
  const unique_kind_id = Object.values(unique_kind);
  return unique_kind_id;
}

export { get_unique_kind_id_name };

/**********************************************/
function get_filtered_info_from_id(db, id, filter) {
  const filteredResults = db.filter((t) => filter.includes(t[id]));

  return filteredResults;
}

export { get_filtered_info_from_id };

/**********************************************/
function get_all_ids_unpack_1x(db, id) {
  const Ids = {};
  db.forEach((d) => (Ids[d[id]] = d[id]));
  const allIds = Object.values(Ids);

  return allIds;
}

export { get_all_ids_unpack_1x };

/**********************************************/
function get_all_ids_unpack_2x(db, subdb, id) {
  const Ids = {};
  db.forEach((d) => d[subdb].forEach((s) => (Ids[s[id]] = s[id])));
  const allIds = Object.values(Ids);

  return allIds;
}

export { get_all_ids_unpack_2x };

/**********************************************/
function updateCardItemInfos_categories(db, categories) {
  const kind_ids = categories
    .filter((c) => c.checked === true)
    .map((c) => c.kind_id);

  const validTextIds = get_filtered_info_from_id(
    db.texts,
    "kind_id",
    kind_ids
  ).map((t) => t.id);
  const cardInfos = get_filtered_cardItemInfos(db, validTextIds);

  return cardInfos;
}

export { updateCardItemInfos_categories };

/**********************************************/
function updateCardItemInfos_searchText(db, categories, searchArray) {
  const kind_ids = categories
    .filter((c) => c.checked === true)
    .map((c) => c.kind_id);

  let cardInfos;
  const validTexts = get_filtered_info_from_id(db.texts, "kind_id", kind_ids);
  if (searchArray.length !== 0) {
    const searchOutput = search_word_in_text(searchArray, validTexts);
    const validTextIds = get_all_ids_unpack_2x(searchOutput, "matches", "id");
    cardInfos = get_filtered_cardItemInfos(db, validTextIds);
  } else {
    const validTextIds = validTexts.map((m) => m.id);
    cardInfos = get_filtered_cardItemInfos(db, validTextIds);
  }

  return cardInfos;
}

export { updateCardItemInfos_searchText };

/**********************************************/
function updateCardItemInfos_OR(db, categories, searchArray) {
  const kind_ids = categories
    .filter((c) => c.checked === true)
    .map((c) => c.kind_id);

  let cardInfos;
  const validTexts = get_filtered_info_from_id(db.texts, "kind_id", kind_ids);
  if (searchArray.length !== 0) {
    const searchOutput = search_word_in_text(searchArray, validTexts);
    const validTextIds = get_all_ids_unpack_2x(searchOutput, "matches", "id");
    cardInfos = get_filtered_cardItemInfos(db, validTextIds);
  } else {
    const validTextIds = validTexts.map((m) => m.id);
    cardInfos = get_filtered_cardItemInfos(db, validTextIds);
  }

  return cardInfos;
}

export { updateCardItemInfos_OR };

/**********************************************/
function updateCardItemInfos_AND(db, categories, searchArray) {
  const kind_ids = categories
    .filter((c) => c.checked === true)
    .map((c) => c.kind_id);

  let cardInfos;
  const validTexts = get_filtered_info_from_id(db.texts, "kind_id", kind_ids);
  if (searchArray.length !== 0) {
    const searchOutput = search_word_in_text(searchArray, validTexts);
    const textIds_pro_searchText = searchOutput.map((s) =>
      s.matches.map((m) => m.id)
    );
    const validTextIds = textIds_pro_searchText.reduce((p, c) =>
      p.filter((e) => c.includes(e))
    );
    cardInfos = get_filtered_cardItemInfos(db, validTextIds);
  } else {
    const validTextIds = validTexts.map((m) => m.id);
    cardInfos = get_filtered_cardItemInfos(db, validTextIds);
  }

  return cardInfos;
}

export { updateCardItemInfos_AND };
