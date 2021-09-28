import db from "../backend/jsons/test_db";
import {
  get_all_ids_unpack_1x,
  get_filtered_info_from_id,
} from "../functions/helper_functions";

describe("Filter IC Texte..", () => {
  test("... filter input db with filter array", () => {
    // ARANGE
    const filter = [2, 3];
    // ACT
    const filteredResults = get_filtered_info_from_id(
      db.texts,
      "kind_id",
      filter
    );

    // ASSERT
    expect(filteredResults.length).toStrictEqual(3);
    expect(filteredResults[0].id).toStrictEqual(2);
  });

  test("... get all text ids", () => {
    // ARANGE
    // ACT
    const allIds = get_all_ids_unpack_1x(db.texts, "id");
    // ASSERT
    expect(allIds.length).toStrictEqual(4);
    expect(allIds).toStrictEqual([2, 6, 8, 12]);
  });
});
