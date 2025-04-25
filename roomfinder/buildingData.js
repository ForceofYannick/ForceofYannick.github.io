export const buildingData = [
  {
    name: "A",
    floors: [
      { "name": "UG", "rooms": ["1a28"] },
      { "name": "EG", "rooms": ["2a28"] },
      { "name": "3.", "rooms": ["3a04", "3a11", "3a28", "3a32", "3m04"] },
      { "name": "4.", "rooms": ["4a07", "4a32"] },
      { "name": "5.", "rooms": ["5a10", "5a28", "5a35", "5a45"] },
      { "name": "6.", "rooms": ["a04", "a32", "a38", "a44"] },
      { "name": "7.", "rooms": ["7a04", "7a11", "7a32", "7a34", "7a40"] },
      { "name": "8.", "rooms": ["9a04", "9a32", "9a43"] }, // no typo, rooms actually have prefix 9a
      { "name": "9.", "rooms": ["9a04", "9a07", "9a32", "9a35", "9a44"] },
      { "name": "10.", "rooms": ["10a14", "10a28", "10a34", "10a42", "10a44"] },
      { "name": "11.", "rooms": ["11a04", "11a34"] },
      { "name": "12.", "rooms": ["12a04", "12a28", "12a40"] },
      { "name": "13.", "rooms": ["13a34"] }
    ],
    position: { x: -15, y: 1, z: 12 },
    groundLvlHeight: -5.5
  },

  {
    name: "B",
    floors: [
      { "name": "UG", "rooms": ["1b01"] },
      { "name": "EG", "rooms": [] },
      { "name": "3.", "rooms": ["a38","a35","a08","a11"] },
      { "name": "4.", "rooms": ["a35", "a38"] },
      { "name": "5.", "rooms": ["a35", "a32"] },
      { "name": "6.", "rooms": ["a26", "a34", "a29", "a32"] },
      { "name": "7.", "rooms": ["a10", "a14", "a20", "p10", "a23", "a07", "p07"] },
      { "name": "8.", "rooms": ["a08", "a23", "a26", "a34", "p17"] },
      { "name": "9.", "rooms": ["a44", "a18"] },
      { "name": "10.", "rooms": ["p17", "p22", "p26", "p29", "p32", "a16", "a20", "a23", "a29", "a32", "a38", "r38"] }
    ],
    position: { x: -14, y: -0.5, z: 2 },
    groundLvlHeight: -4
  },

  {
    name: "C",
    floors: [
      { "name": "UG", "rooms": [] },
      { "name": "UG", "rooms": ["A25","A29", "p25", "p43", "p23","c02a17","h11","h33","n03"] },
      { "name": "EG", "rooms": ["p25", "p22", "n14","n15","n16"] },
      { "name": "4.", "rooms": ["p34", "p39", "a42", "a33", "a39", "p36", "a36","c04h33"] },
      { "name": "5.", "rooms": ["p22", "p28", "p40", "p46", "a26", "a40","a23", "a08", "a14", "p08","a23","s6","s7","s8"] },
      { "name": "6.", "rooms": ["a40","a14","a29","a46","a08","a11","p19","a11","p16","p25","s9","s10","s11"] },
      { "name": "7.", "rooms": ["a04","a35","a32"] },
      { "name": "8.", "rooms": ["p17","a41","a32"] },
      { "name": "9.", "rooms": ["a34","c10a32","g03","h33","h36","a19","a16","c9g09","c9a03"] },
      { "name": "10.", "rooms": ["a16","a34","a32","a23","p13","p17","c10h33"] }
    ],
    position: { x: 0, y: -1.5, z: 0 },
    groundLvlHeight: -3
  },

  {
    name: "D",
    floors: [
      { "name": "UG", "rooms": ["D1"] },
      { "name": "EG", "rooms": ["D2"] },
      { "name": "3.", "rooms": ["D3"] },
      { "name": "4.", "rooms": ["D4"] },
      { "name": "5.", "rooms": ["D5"] },
      { "name": "6.", "rooms": ["D6"] },
      { "name": "7.", "rooms": ["D7"] },
      { "name": "8.", "rooms": ["D7"] },
      { "name": "9.", "rooms": ["D7"] }
    ],
    position: { x: 6, y: -1, z: 6 },
    groundLvlHeight: -3.5
  },

  {
    name: "E",
    floors: [
      { "name": "UG", "rooms": [] },
      { "name": "EG", "rooms":  ["2p31",  "2p07",  "4p25",  "2a14"] },
      { "name": "3.", "rooms":  ["3r25",  "3p32",  "3a22",  "9a22",  "9a03",  "3a22", "3a25"] },
      { "name": "4.", "rooms":  ["4p43",  "4p07",  "4p34",  "4p22",  "4p10"] },
      { "name": "5.", "rooms":  ["5a38",  "5a28",  "5a14",  "5p13",  "5p10",  "5a32", "5p19", "5p25", "5p22"] },
      { "name": "6.", "rooms":  ["6p22",  "6p25",  "6p37",  "6q16",  "6q34",  "6r10"] },
      { "name": "7.", "rooms":  ["7a03",  "7a14",  "7a28",  "7a30",  "7p03",  "7p07", "7p22"] },
      { "name": "8.", "rooms":  ["8p03",  "8p07",  "8p10",  "8p13",  "8p16",  "8p19", "8p22", "8p25", "8p34", "8p37"] },
      { "name": "9.", "rooms":  ["9a14",  "9a29",  "9a41",  "9p22",  "9p25",  "9p32"] },
      { "name": "10.", "rooms": ["10a23", "10a41", "10p13", "10p14", "10p28", "10p31"] },
      { "name": "11.", "rooms": ["Tierhaltung"] }
    ],
    position: { x: -9, y: 0, z: 18 },
    groundLvlHeight: -4.5
  },

  {
    name: "F",
    floors: [
      { "name": "UG", "rooms": ["F1"] },
      { "name": "EG", "rooms": ["F2"] },
      { "name": "1.", "rooms": ["F3"] },
      { "name": "2.", "rooms": ["F4"] },
    ],
    position: { x: -15, y: -3.5, z: 20 },
    size: { x: 5, y: 5 },
    groundLvlHeight: -1
  },

  {
    name: "G",
    floors: [
      { "name": "UG", "rooms": ["G1"] },
      { "name": "EG", "rooms": ["G2"] },
      { "name": "2.", "rooms": ["G3"] },
      { "name": "3.", "rooms": ["G4"] }
    ],
    position: { x: -8.5, y: -3.5, z: 0 },
    size: { x: 4, y: 5.5 },
    groundLvlHeight: -1
  },

  {
    name: "HZ",
    floors: [
      { "name": "UG", "rooms": ["4d09", "8d09", "8d10", "8d12", "8d11", "8d04", "8d05", "8d06"] },
      { "name": "EG", "rooms": ["Bibliothek 1", "Bibliothek 2", "N1", "N2"] },
      { "name": "OG", "rooms": ["N5", "N6", "N7", "N8", "N9"] }
    ],
    position: { x: -7, y: -4, z: 10 },
    size: { x: 13, y: 10 },
    groundLvlHeight: -0.5
  },
  {
    name: "Bio",
    floors: [
      { "name": "EG", "rooms": ["N10", "N11"] }
    ],
    position: { x: -14, y: -4, z: -17 },
    size: { x: 7, y: 7 },
    groundLvlHeight: -0.5
  },
  {
    name: "GUZ",
    floors: [
      { "name": "UG", "rooms": [] },
      { "name": "EG", "rooms": [] },
      { "name": "2.", "rooms": [] },
      { "name": "3.", "rooms": [] },
      { "name": "4.", "rooms": [] }
    ],
    position: { x: -4, y: -3, z: 33 },
    size: { x: 7, y: 12 },
    groundLvlHeight: -1.5
  },
  {
    name: "Mensa",
    floors: [
      { "name": "EG", "rooms": ["Cafeteria"] },
      { "name": "OG", "rooms": ["Mensa"] }
    ],
    position: { x: -16, y: -3.5, z: 29 },
    size: { x: 10, y: 10 },
    groundLvlHeight: -1
  },

  {
    name: "ZMBP",
    floors: [
      { "name": "UG", "rooms": [] },
      { "name": "UG", "rooms": [] },
      { "name": "EG", "rooms": [] },
      { "name": "4.", "rooms": [] },
      { "name": "5.", "rooms": [] },
      { "name": "6.", "rooms": [] },
    ],
    size: { x: 8, y: 12 },
    position: { x: 6, y: -3.5, z: 19 },
    groundLvlHeight: -1
  },
];
