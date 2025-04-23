export const buildingData = [
  {
    name: "A",
    floors: [
      { "name": "UG", "rooms": ["A1"] },
      { "name": "EG", "rooms": ["A2"] },
      { "name": "1.", "rooms": ["A3"] },
      { "name": "2.", "rooms": ["A4"] }
    ],
    position: { x: -15, y: -2.5, z: 20 },
    size: { x: 5, y: 5 },
    groundLvlHeight: -1
  },

  {
    name: "B",
    floors: [
      { "name": "UG", "rooms": ["B1"] },
      { "name": "EG", "rooms": ["B2"] },
      { "name": "1.", "rooms": ["B3"] },
      { "name": "2.", "rooms": ["B4"] },
      { "name": "3.", "rooms": ["B5"] },
      { "name": "4.", "rooms": ["B6"] },
      { "name": "5.", "rooms": ["B7"] },
      { "name": "6.", "rooms": ["B8"] },
      { "name": "7.", "rooms": ["B9"] }
    ],
    position: { x: -14, y: 0, z: 3 },
    groundLvlHeight: -3.5
  },

  {
    name: "C",
    floors: [
      { "name": "UG1", "rooms": ["C1"] },
      { "name": "EG", "rooms": ["C2"] },
      { "name": "1.", "rooms": ["C3"] },
      { "name": "2.", "rooms": ["C4"] },
      { "name": "3.", "rooms": ["C5"] },
      { "name": "4.", "rooms": ["C6"] },
      { "name": "5.", "rooms": ["C7"] },
      { "name": "6.", "rooms": ["C8"] },
      { "name": "7.", "rooms": ["C9"] }
    ],
    position: { x: 0, y: 0, z: 0 },
    groundLvlHeight: -3.5
  },

  {
    name: "D",
    floors: [
      { "name": "UG", "rooms": ["D1"] },
      { "name": "EG", "rooms": ["D2"] },
      { "name": "1.", "rooms": ["D3"] },
      { "name": "2.", "rooms": ["D4"] },
      { "name": "3.", "rooms": ["D5"] },
      { "name": "4.", "rooms": ["D6"] },
      { "name": "5.", "rooms": ["D7"] },
      { "name": "6.", "rooms": ["D8"] },
      { "name": "7.", "rooms": ["D9"] }
    ],
    position: { x: 8, y: 0, z: 6 },
    groundLvlHeight: -3.5
  },

  {
    name: "E",
    floors: [
      { "name": "UG", "rooms": [] },
      { "name": "2", "rooms":  ["2p31",  "2p07",  "4p25",  "2a14"] },
      { "name": "3", "rooms":  ["3r25",  "3p32",  "3a22",  "9a22",  "9a03",  "3a22", "3a25"] },
      { "name": "4", "rooms":  ["4p43",  "4p07",  "4p34",  "4p22",  "4p10"] },
      { "name": "5", "rooms":  ["5a38",  "5a28",  "5a14",  "5p13",  "5p10",  "5a32", "5p19", "5p25", "5p22"] },
      { "name": "6", "rooms":  ["6p22",  "6p25",  "6p37",  "6q16",  "6q34",  "6r10"] },
      { "name": "7", "rooms":  ["7a03",  "7a14",  "7a28",  "7a30",  "7p03",  "7p07", "7p22"] },
      { "name": "8", "rooms":  ["8p03",  "8p07",  "8p10",  "8p13",  "8p16",  "8p19", "8p22", "8p25", "8p34", "8p37"] },
      { "name": "9", "rooms":  ["9a14",  "9a29",  "9a41",  "9p22",  "9p25",  "9p32"] },
      { "name": "10", "rooms": ["10a23", "10a41", "10p13", "10p14", "10p28", "10p31"] },
      { "name": "11", "rooms": ["Tierhaltung"] }
    ],
    position: { x: -9, y: 0, z: 18 },
    groundLvlHeight: -4.5
  },

  {
    name: "F",
    floors: [
<<<<<<< Updated upstream
      { "name": "UG", "rooms": ["F1G09"] },
      { "name": "EG", "rooms": ["F2A03", "F2A05"] },
      { "name": "1.", "rooms": ["F3G01"] },
      { "name": "2.", "rooms": ["F4A14"] },
      { "name": "3.", "rooms": ["F5A15"] },
      { "name": "4.", "rooms": ["F6A16"] },
      { "name": "5.", "rooms": ["F7A17"] },
      { "name": "6.", "rooms": ["F8A18"] },
      { "name": "7.", "rooms": ["F9A19"] },
      { "name": "8.", "rooms": ["F11A18"] },
      { "name": "9.", "rooms": ["F11A18"] },
      { "name": "10.", "rooms": ["F12A18"] }
=======
      { "name": "UG", "rooms": ["F1"] },
      { "name": "EG", "rooms": ["F2"] },
      { "name": "1.", "rooms": ["F3"] },
      { "name": "2.", "rooms": ["F4"] },
      { "name": "3.", "rooms": ["F5"] },
      { "name": "4.", "rooms": ["F6"] },
      { "name": "5.", "rooms": ["F7"] },
      { "name": "6.", "rooms": ["F8"] },
      { "name": "7.", "rooms": ["F9"] },
      { "name": "8.", "rooms": ["F10"] },
      { "name": "9.", "rooms": ["F11"] },
      { "name": "10.", "rooms": ["F12"] }
>>>>>>> Stashed changes
    ],
    position: { x: -15, y: 1.5, z: 12 },
    groundLvlHeight: -5
  },

  {
    name: "G",
    floors: [
      { "name": "EG", "rooms": ["G1"] },
      { "name": "1.", "rooms": ["G2"] },
      { "name": "2.", "rooms": ["G3"] },
      { "name": "3.", "rooms": ["G4"] }
    ],
    position: { x: -9, y: -2.5, z: 0 },
    size: { x: 4, y: 5 },
    groundLvlHeight: -2
  },

  {
    name: "HZ",
    floors: [
      { "name": "UG", "rooms": ["4d09", "8d09", "8d10", "8d12", "8d11", "8d04", "8d05", "8d06"] },
      { "name": "EG", "rooms": ["Bibliothek 1", "Bibliothek 2", "N1", "N2"] },
      { "name": "OG", "rooms": ["N5", "N6", "N7", "N8", "N9"] }
    ],
    position: { x: -4, y: -4, z: 10 },
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
  }
];
