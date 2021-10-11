/* Function for CardItem of the IC Texts */

function get_filtered_cardItemInfos(db, filters) {
  const filteredOutput = [];

  filters.map((element) => {
    const f = [element];
    // Text
    const filteredTexte = db.texts.filter((t) => f.includes(t.id));

    // Keywords
    const filteredKeywords = db.keywords.filter((t) => f.includes(t.texts_id));

    // Sentiments
    const filteredSentimentsTop = db.sentiments
      .filter((t) => f.includes(t.texts_id))
      .sort((pv, cv) =>
        pv.score < cv.score ? 1 : -1
      ) /* absteigend sortiert */
      .slice(0, 3); /* maximal 3 ausgeben */
    const filteredSentimentsFlop = db.sentiments
      .filter((t) => f.includes(t.texts_id))
      .sort((pv, cv) =>
        pv.score > cv.score ? 1 : -1
      ) /* aufsteigend sortiert */
      .slice(0, 3); /* maximal 3 ausgeben */

    // Categories
    const filteredCategories = db.categories
      .filter((t) => f.includes(t.texts_id))
      .filter((c) => c.score >= 0.8) /* Score mind. 0.8 */
      .sort((pv, cv) =>
        pv.score < cv.score ? 1 : -1
      ) /* absteigend sortiert */
      .slice(0, 3); /* maximal 5 ausgeben */

    // Concepts
    const filteredConcepts = db.concepts
      .filter((t) => f.includes(t.texts_id))
      .filter((c) => c.relevance >= 0.9) /* Relevance mind. 0.9 */
      .sort((pv, cv) =>
        pv.relevance < cv.relevance ? 1 : -1
      ); /* absteigend sortiert */

    // Topics
    const filteredTopics = db.topics.filter((t) => f.includes(t.texts_id));

    const filteredOutputId = {
      texts: filteredTexte,
      keywords: filteredKeywords,
      sentimentsTop: filteredSentimentsTop,
      sentimentsFlop: filteredSentimentsFlop,
      categories: filteredCategories,
      concepts: filteredConcepts,
      topics: filteredTopics,
    };

    return filteredOutput.push(filteredOutputId);
  });

  return filteredOutput.sort((pv, cv) =>
    pv.texts[0].insert_dt < cv.texts[0].insert_dt ? 1 : -1
  );
}

export { get_filtered_cardItemInfos };
