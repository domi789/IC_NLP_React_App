import db from "../backend/jsons/test_db";
import { get_filtered_cardItemInfos } from "../functions/get_filtered_cardItemInfos";
import {
  get_all_ids_unpack_2x,
  get_filtered_info_from_id,
  get_unique_kind_id_name,
  updateCardItemInfos,
  updateCardItemInfos_AND,
  updateCardItemInfos_OR,
} from "../functions/helper_functions";
import { search_word_in_text } from "../functions/search_word_in_text";

// Arrange, Act and Assert (AAA) Pattern
describe("All Information for Cards", () => {
  test("Initial Value", () => {
    // ARANGE
    // Get all text_ids
    const allTextIds = db.texts.map((d) => d.id);

    // Act
    const cardInfos = get_filtered_cardItemInfos(db, allTextIds);

    // Assert
    expect(cardInfos[2].texts[0].id).toStrictEqual(6);
    expect(cardInfos[2].categories[0].score).toStrictEqual(0.9328);
    expect(cardInfos[2].texts.length).toStrictEqual(1); // exact 1 text
    expect(cardInfos[2].sentimentsFlop.length).toStrictEqual(3); // flop 3 results
    expect(cardInfos[2].sentimentsTop.length).toStrictEqual(3); // top 3 results
    expect(cardInfos[2].categories.length).toBeLessThan(6); // maximal 5 ausgeben
  });

  test("selection change with text categories (text kind)", () => {
    // ARANGE
    // Get all categories
    const allCategories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));
    // change specific categorie to unchecked
    allCategories[1].checked = false;

    const searchArray = [];

    // Act
    const cardInfos = updateCardItemInfos_OR(db, allCategories, searchArray);

    // Assert
    // expect(cardInfos[0].texts[0].id).toStrictEqual(8);
    // expect(cardInfos[0].categories[0].score).toStrictEqual(0.9238);
    expect(cardInfos[3]).toBeUndefined;
    expect(cardInfos[0].texts.length).toStrictEqual(1); // exact 1 text
    expect(cardInfos[0].sentimentsFlop.length).toStrictEqual(3); // flop 3 results
    expect(cardInfos[0].sentimentsTop.length).toStrictEqual(3); // top 3 results
    expect(cardInfos[0].categories.length).toBeLessThan(6); // maximal 5 ausgeben
  });

  test("selection change with text search - only one input word", () => {
    // ARANGE
    const searchText = ["Konsolidierungsmodus"];

    // Act
    // find text ids
    // const searchWord = search_word_in_text(searchText, db.texts);
    const searchWord = search_word_in_text(searchText, db.texts);
    const validTextIds = get_all_ids_unpack_2x(searchWord, "matches", "id");
    const cardInfos = get_filtered_cardItemInfos(db, validTextIds);

    // Assert
    expect(cardInfos[0].texts[0].id).toStrictEqual(2);
    expect(cardInfos[0].categories[0].score).toStrictEqual(0.8718);
    expect(cardInfos[1]).toBeUndefined;
    expect(cardInfos[0].texts.length).toStrictEqual(1); // exact 1 text
    expect(cardInfos[0].sentimentsFlop.length).toStrictEqual(3); // flop 3 results
    expect(cardInfos[0].sentimentsTop.length).toStrictEqual(3); // top 3 results
    expect(cardInfos[0].categories.length).toBeLessThan(6); // maximal 5 ausgeben
  });

  test("CardInfo Output, fixed string vs ids call", () => {
    // ARANGE
    // Act
    const filter = db.texts.map((d) => d.id);
    const cardInfos = get_filtered_cardItemInfos(db, filter);

    // Assert
    expect(filter).toStrictEqual([2, 6, 8, 12]);
  });

  test("Active CardItem info: OR SearchOptions ", () => {
    // ARANGE
    // Prepare categories
    const categories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));
    categories[1].checked = false;

    // prepare searchArray
    const searchArray = ["Konsolidierungsmodus", "Ascom"];

    // Act
    const cardInfos = updateCardItemInfos_OR(db, categories, searchArray);

    // Assert
    expect(cardInfos[0].texts[0].id).toStrictEqual(12);
  });

  test("Active CardItem infos: no SearchTexts ", () => {
    // ARANGE
    // Prepare categories
    const categories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));
    categories[1].checked = false;

    // prepare searchArray
    const searchArray = [];
    const readtime_total = db.texts.reduce((acc, c) => acc + c.readtime, 0);

    // Act
    const cardInfos = updateCardItemInfos_OR(db, categories, searchArray);

    const readtime_selection = cardInfos.reduce(
      (acc, c) => acc + c.texts[0].readtime,
      0
    );

    const readtime_prozent = Math.round(
      (readtime_selection / readtime_total) * 100
    );
    // console.log(total_readtime);
    // Assert
    // expect(cardInfos[0].texts[0].id).toStrictEqual(8);
    expect(readtime_selection).toStrictEqual(8);
  });

  test("Active CardItem info: AND SearchOptions", () => {
    // ARANGE
    // Prepare categories
    const categories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));
    categories[1].checked = false;

    // prepare searchArray
    const searchArray = ["der", "Ascom"];

    // Act
    const cardInfos = updateCardItemInfos_AND(db, categories, searchArray);

    // Assert
    expect(cardInfos[0].texts[0].id).toStrictEqual(12);
  });

  test("Active CardItem info: Split Search Text into Array", () => {
    // ARANGE
    // Prepare categories
    const categories = get_unique_kind_id_name(db).map((k) => ({
      ...k,
      checked: true,
    }));
    categories[1].checked = false;

    // prepare searchArray
    // const searchText = "Ascom der, ein";
    const searchText = "ein";
    const searchArray = searchText.replace(",", "").replace(";", "").split(" ");

    // Act
    const cardInfos = updateCardItemInfos_AND(db, categories, searchArray);
    // console.log(searchArray);

    const topics = [];
    cardInfos.map((c) =>
      c.topics.forEach((t) => {
        topics.push(t);
      })
    );

    // const topics2 = Object.values(topics);

    // Assert
    expect(cardInfos[0].texts[0].id).toStrictEqual(12);
  });
});
