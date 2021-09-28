import db from "../backend/jsons/test_db";

describe("Summiere Lesezeit", () => {
  test("Lesezeit", () => {
    // ARANGE
    // ACT
    const total_lesezeit = db.texts.reduce((acc, t) => acc + t.readtime, 0);
    console.log(total_lesezeit);
    // ASSERT
  });
});
