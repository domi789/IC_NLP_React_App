// import {sample} from '../functions/text_search'

describe("Beispiel für map, reduce und filter", () => {
  // super page https://medium.com/poka-techblog/simplify-your-javascript-use-map-reduce-and-filter-bd02c593cc2d

  test("map() function", () => {
    // What we have..
    const officers = [
      { id: 20, name: "Captain Piett" },
      { id: 24, name: "General Veers" },
      { id: 56, name: "Admiral Ozzel" },
      { id: 88, name: "Commander Jerjerrod" },
    ];

    // What we want
    const expect_OfficersIds = [20, 24, 56, 88];

    // long version
    var officersIds_long = officers.map(function (officer) {
      return officer.id;
    });
    console.log(officersIds_long);

    // short version
    const officersIds_short = officers.map((officer) => officer.id);
    console.log(officersIds_short);

    // Test
    expect(officersIds_long).toStrictEqual(expect_OfficersIds);
  });

  test("reduce() function", () => {
    // What we have..
    const pilots = [
      {
        id: 10,
        name: "Poe Dameron",
        years: 14,
      },
      {
        id: 2,
        name: "Temmin 'Snap' Wexley",
        years: 30,
      },
      {
        id: 41,
        name: "Tallissan Lintra",
        years: 16,
      },
      {
        id: 99,
        name: "Ello Asty",
        years: 22,
      },
    ];

    // long version
    var totalYears_long = pilots.reduce(function (accumulator, pilot) {
      return accumulator + pilot.years;
    }, 0);
    console.log(totalYears_long);

    // short version
    const totalYears_short = pilots.reduce(
      (acc, pilot) => acc + pilot.years,
      0
    );
    console.log(totalYears_short);

    // Test
    expect(totalYears_long).toStrictEqual(82);
  });

  test("filter() function", () => {
    // What we have..
    const pilots = [
      {
        id: 2,
        name: "Wedge Antilles",
        faction: "Rebels",
      },
      {
        id: 8,
        name: "Ciena Ree",
        faction: "Empire",
      },
      {
        id: 40,
        name: "Iden Versio",
        faction: "Empire",
      },
      {
        id: 66,
        name: "Thane Kyrell",
        faction: "Rebels",
      },
    ];

    // What we want
    const expect_rebels = [
      { id: 2, name: "Wedge Antilles", faction: "Rebels" },
      { id: 66, name: "Thane Kyrell", faction: "Rebels" },
    ];

    // long version
    var rebels_long = pilots.filter(function (pilot) {
      return pilot.faction === "Rebels";
    });
    console.log(rebels_long);

    // short version
    const rebels_short = pilots.filter((pilot) => pilot.faction === "Rebels");
    console.log(rebels_short);

    // Test
    expect(rebels_long).toStrictEqual(expect_rebels);
  });

  test("map, reduce filter combined...", () => {
    // What we have..
    const personnel = [
      {
        id: 5,
        name: "Luke Skywalker",
        pilotingScore: 98,
        shootingScore: 56,
        isForceUser: true,
      },
      {
        id: 82,
        name: "Sabine Wren",
        pilotingScore: 73,
        shootingScore: 99,
        isForceUser: false,
      },
      {
        id: 22,
        name: "Zeb Orellios",
        pilotingScore: 20,
        shootingScore: 59,
        isForceUser: false,
      },
      {
        id: 15,
        name: "Ezra Bridger",
        pilotingScore: 43,
        shootingScore: 67,
        isForceUser: true,
      },
      {
        id: 11,
        name: "Caleb Dume",
        pilotingScore: 71,
        shootingScore: 85,
        isForceUser: true,
      },
    ];

    // Step by Step..
    var jediPersonnel = personnel.filter(function (person) {
      return person.isForceUser;
    });
    console.log(jediPersonnel);

    var jediScores = jediPersonnel.map(function (jedi) {
      return jedi.pilotingScore + jedi.shootingScore;
    });
    console.log(jediScores);

    var totalJediScore = jediScores.reduce(function (acc, score) {
      return acc + score;
    }, 0);
    console.log(totalJediScore);

    // Combined
    var totalJediScore_long = personnel
      .filter(function (person) {
        return person.isForceUser;
      })
      .map(function (jedi) {
        return jedi.pilotingScore + jedi.shootingScore;
      })
      .reduce(function (acc, score) {
        return acc + score;
      }, 0);
    console.log(totalJediScore_long);

    // short
    const totalJediScore_short = personnel
      .filter((person) => person.isForceUser)
      .map((jedi) => jedi.pilotingScore + jedi.shootingScore)
      .reduce((acc, score) => acc + score, 0);
    console.log(totalJediScore_short);

    // test
    expect(totalJediScore_long).toStrictEqual(420);
  });
});
