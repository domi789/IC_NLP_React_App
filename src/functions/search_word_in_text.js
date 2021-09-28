//

function matcher(regexp) {
  return function (obj) {
    var found = false;
    Object.keys(obj).map((key) => {
      if (!found) {
        if (typeof obj[key] == "string" && regexp.exec(obj[key])) {
          found = true;
        }
      }
      return found;
    });
    return found;
  };
}

function search_word_in_text(teststrings, haystack) {
  const sampleItems = [];
  teststrings.map((needle) => {
    // console.log('searching for: %s', needle);
    var re1 = new RegExp(
      // "\\b" + needle + "\\b",  /* exact word search: add space in front and after word */
      needle,
      "i"
    ); /* i: gross-/kleinschreibung ignorieren*/
    var matches = haystack.filter(matcher(re1));
    // console.log('found count: %s', matches.length);
    // console.log('text id: %s', matches.id) ;
    return sampleItems.push({ teststring: needle, matches });
  });
  return sampleItems;
}

export { search_word_in_text };
