import { Size } from "./size.js";
import { Position } from "./position.js";

const standardFloorSize = new Size(3, 1, 6);
const standardRoomSize = new Size(1, 1, 1);

export const buildingData = [
  {
    name: "A",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-15, -1, 12), size: new Size(3, 13, 6), rooms: [{ name: "1a28", size: standardRoomSize }] },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-15, 0, 12), size: new Size(3, 13, 6), rooms: [{ name: "2a28", size: standardRoomSize }] },
      { name: "3.", size: standardFloorSize, level: 3, position: new Position(-15, 1, 12), size: new Size(3, 13, 6), rooms: ["3a04", "3a11", "3a28", "3a32", "3m04"].map(name => ({ name, size: standardRoomSize })) },
      { name: "4.", size: standardFloorSize, level: 4, position: new Position(-15, 2, 12), size: new Size(3, 13, 6), rooms: ["4a07", "4a32"].map(name => ({ name, size: standardRoomSize })) },
      { name: "5.", size: standardFloorSize, level: 5, position: new Position(-15, 3, 12), size: new Size(3, 13, 6), rooms: ["5a10", "5a28", "5a35", "5a45"].map(name => ({ name, size: standardRoomSize })) },
      { name: "6.", size: standardFloorSize, level: 6, position: new Position(-15, 4, 12), size: new Size(3, 13, 6), rooms: ["a04", "a32", "a38", "a44"].map(name => ({ name, size: standardRoomSize })) },
      { name: "7.", size: standardFloorSize, level: 7, position: new Position(-15, 5, 12), size: new Size(3, 13, 6), rooms: ["7a04", "7a11", "7a32", "7a34", "7a40"].map(name => ({ name, size: standardRoomSize })) },
      { name: "8.", size: standardFloorSize, level: 8, position: new Position(-15, 6, 12), size: new Size(3, 13, 6), rooms: ["9a04", "9a32", "9a43"].map(name => ({ name, size: standardRoomSize })) }, // no typo, rooms actually have prefix 9a
      { name: "9.", size: standardFloorSize, level: 9, position: new Position(-15, 7, 12), size: new Size(3, 13, 6), rooms: ["9a04", "9a07", "9a32", "9a35", "9a44"].map(name => ({ name, size: standardRoomSize })) },
      { name: "10.", size: standardFloorSize, level: 10, position: new Position(-15, 8, 12), size: new Size(3, 13, 6), rooms: ["10a14", "10a28", "10a34", "10a42", "10a44"].map(name => ({ name, size: standardRoomSize })) },
      { name: "11.", size: standardFloorSize, level: 11, position: new Position(-15, 9, 12), size: new Size(3, 13, 6), rooms: ["11a04", "11a34"].map(name => ({ name, size: standardRoomSize })) },
      { name: "12.", size: standardFloorSize, level: 12, position: new Position(-15, 10, 12), size: new Size(3, 13, 6), rooms: ["12a04", "12a28", "12a40"].map(name => ({ name, size: standardRoomSize })) },
      { name: "13.", size: standardFloorSize, level: 13, position: new Position(-15, 11, 12), size: new Size(3, 13, 6), rooms: ["13a34"].map(name => ({ name, size: standardRoomSize })) },
    ],
  },

  {
    name: "B",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-14, -1, 2), size: new Size(3, 10, 6), rooms: [{ name: "1b01", size: standardRoomSize }] },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-14, 0, 2), size: new Size(3, 10, 6), rooms: [] },
      { name: "3.", size: standardFloorSize, level: 3, position: new Position(-14, 1, 2), size: new Size(3, 10, 6), rooms: ["a38", "a35", "a08", "a11"].map(name => ({ name, size: standardRoomSize })) },
      { name: "4.", size: standardFloorSize, level: 4, position: new Position(-14, 2, 2), size: new Size(3, 10, 6), rooms: ["a35", "a38"].map(name => ({ name, size: standardRoomSize })) },
      { name: "5.", size: standardFloorSize, level: 5, position: new Position(-14, 3, 2), size: new Size(3, 10, 6), rooms: ["a35", "a32"].map(name => ({ name, size: standardRoomSize })) },
      { name: "6.", size: standardFloorSize, level: 6, position: new Position(-14, 4, 2), size: new Size(3, 10, 6), rooms: ["a26", "a34", "a29", "a32"].map(name => ({ name, size: standardRoomSize })) },
      { name: "7.", size: standardFloorSize, level: 7, position: new Position(-14, 5, 2), size: new Size(3, 10, 6), rooms: ["a10", "a14", "a20", "p10", "a23", "a07", "p07"].map(name => ({ name, size: standardRoomSize })) },
      { name: "8.", size: standardFloorSize, level: 8, position: new Position(-14, 6, 2), size: new Size(3, 10, 6), rooms: ["a08", "a23", "a26", "a34", "p17"].map(name => ({ name, size: standardRoomSize })) },
      { name: "9.", size: standardFloorSize, level: 9, position: new Position(-14, 7, 2), size: new Size(3, 10, 6), rooms: ["a44", "a18"].map(name => ({ name, size: standardRoomSize })) },
      { name: "10.", size: standardFloorSize, level: 10, position: new Position(-14, 8, 2), size: new Size(3, 10, 6), rooms: ["p17", "p22", "p26", "p29", "p32", "a16", "a20", "a23", "a29", "a32", "a38", "r38"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },

  {
    name: "C",
    floors: [
      { name: "UG 2", size: standardFloorSize, level: 1, position: new Position(0, -2, 0), size: new Size(3,10,6), rooms: [] },
      { name: "UG 1", size: standardFloorSize, level: 2, position: new Position(0, -1, 0), size: new Size(3,10,6), rooms: ["A25", "A29", "p25", "p43", "p23", "c02a17", "h11", "h33", "n03"].map(name => ({ name, size: standardRoomSize })) },
      { name: "EG", size: standardFloorSize, level: 3, position: new Position(0, 0, 0), size: new Size(3,10,6), rooms: ["p25", "p22", "n14", "n15", "n16"].map(name => ({ name, size: standardRoomSize })) },
      { name: "4.", size: standardFloorSize, level: 4, position: new Position(0, 1, 0), size: new Size(3,10,6), rooms: ["p34", "p39", "a42", "a33", "a39", "p36", "a36", "c04h33"].map(name => ({ name, size: standardRoomSize })) },
      { name: "5.", size: standardFloorSize, level: 5, position: new Position(0, 2, 0), size: new Size(3,10,6), rooms: ["p22", "p28", "p40", "p46", "a26", "a40", "a23", "a08", "a14", "p08", "a23", "s6", "s7", "s8"].map(name => ({ name, size: standardRoomSize })) },
      { name: "6.", size: standardFloorSize, level: 6, position: new Position(0, 3, 0), size: new Size(3,10,6), rooms: ["a40", "a14", "a29", "a46", "a08", "a11", "p19", "a11", "p16", "p25", "s9", "s10", "s11"].map(name => ({ name, size: standardRoomSize })) },
      { name: "7.", size: standardFloorSize, level: 7, position: new Position(0, 4, 0), size: new Size(3,10,6), rooms: ["a04", "a35", "a32"].map(name => ({ name, size: standardRoomSize })) },
      { name: "8.", size: standardFloorSize, level: 8, position: new Position(0, 5, 0), size: new Size(3,10,6), rooms: ["p17", "a41", "a32"].map(name => ({ name, size: standardRoomSize })) },
      { name: "9.", size: standardFloorSize, level: 9, position: new Position(0, 6, 0), size: new Size(3,10,6), rooms: ["a34", "c10a32", "g03", "h33", "h36", "a19", "a16", "c9g09", "c9a03"].map(name => ({ name, size: standardRoomSize })) },
      { name: "10.", size: standardFloorSize, level: 10, position: new Position(0, 7, 0), size: new Size(3,10,6), rooms: ["a16", "a34", "a32", "a23", "p13", "p17", "c10h33"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },

  {
    name: "D",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(6, -1, 6), size: new Size(3,9,6), rooms: [] },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(6, 0, 6), size: new Size(3,9,6), rooms: [] },
      { name: "3.", size: standardFloorSize, level: 3, position: new Position(6, 1, 6), size: new Size(3,9,6), rooms: [] },
      { name: "4.", size: standardFloorSize, level: 4, position: new Position(6, 2, 6), size: new Size(3,9,6), rooms: [] },
      { name: "5.", size: standardFloorSize, level: 5, position: new Position(6, 3, 6), size: new Size(3,9,6), rooms: [] },
      { name: "6.", size: standardFloorSize, level: 6, position: new Position(6, 4, 6), size: new Size(3,9,6), rooms: [] },
      { name: "7.", size: standardFloorSize, level: 7, position: new Position(6, 5, 6), size: new Size(3,9,6), rooms: [] },
      { name: "8.", size: standardFloorSize, level: 8, position: new Position(6, 6, 6), size: new Size(3,9,6), rooms: [] },
      { name: "9.", size: standardFloorSize, level: 9, position: new Position(6, 7, 6), size: new Size(3,9,6), rooms: [] }
    ]
  },

  {
    name: "E",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-9, -1, 18), size: new Size(3,11,6), rooms: [] },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-9, 0, 18), size: new Size(3,11,6), rooms: ["2p31", "2p07", "4p25", "2a14"].map(name => ({ name, size: standardRoomSize })) },
      { name: "3.", size: standardFloorSize, level: 3, position: new Position(-9, 1, 18), size: new Size(3,11,6), rooms: ["3r25", "3p32", "3a22", "9a22", "9a03", "3a22", "3a25"].map(name => ({ name, size: standardRoomSize })) },
      { name: "4.", size: standardFloorSize, level: 4, position: new Position(-9, 2, 18), size: new Size(3,11,6), rooms: ["4p43", "4p07", "4p34", "4p22", "4p10"].map(name => ({ name, size: standardRoomSize })) },
      { name: "5.", size: standardFloorSize, level: 5, position: new Position(-9, 3, 18), size: new Size(3,11,6), rooms: ["5a38", "5a28", "5a14", "5p13", "5p10", "5a32", "5p19", "5p25", "5p22"].map(name => ({ name, size: standardRoomSize })) },
      { name: "6.", size: standardFloorSize, level: 6, position: new Position(-9, 4, 18), size: new Size(3,11,6), rooms: ["6p22", "6p25", "6p37", "6q16", "6q34", "6r10"].map(name => ({ name, size: standardRoomSize })) },
      { name: "7.", size: standardFloorSize, level: 7, position: new Position(-9, 5, 18), size: new Size(3,11,6), rooms: ["7a03", "7a14", "7a28", "7a30", "7p03", "7p07", "7p22"].map(name => ({ name, size: standardRoomSize })) },
      { name: "8.", size: standardFloorSize, level: 8, position: new Position(-9, 6, 18), size: new Size(3,11,6), rooms: ["8p03", "8p07", "8p10", "8p13", "8p16", "8p19", "8p22", "8p25", "8p34", "8p37"].map(name => ({ name, size: standardRoomSize })) },
      { name: "9.", size: standardFloorSize, level: 9, position: new Position(-9, 7, 18), size: new Size(3,11,6), rooms: ["9a14", "9a29", "9a41", "9p22", "9p25", "9p32"].map(name => ({ name, size: standardRoomSize })) },
      { name: "10.", size: standardFloorSize, level: 10, position: new Position(-9, 8, 18), size: new Size(3,11,6), rooms: ["10a23", "10a41", "10p13", "10p14", "10p28", "10p31"].map(name => ({ name, size: standardRoomSize })) },
      { name: "11.", size: standardFloorSize, level: 11, position: new Position(-9, 9, 18), size: new Size(3,11,6), rooms: ["Tierhaltung"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },

  {
    name: "F",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-15, -1, 20), size: new Size(5,4,5), rooms: ["F1"].map(name => ({ name, size: standardRoomSize })) },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-15, 0, 20), size: new Size(5,4,5), rooms: ["F2"].map(name => ({ name, size: standardRoomSize })) },
      { name: "1.", size: standardFloorSize, level: 3, position: new Position(-15, 1, 20), size: new Size(5,4,5), rooms: ["F3"].map(name => ({ name, size: standardRoomSize })) },
      { name: "2.", size: standardFloorSize, level: 4, position: new Position(-15, 2, 20), size: new Size(5,4,5), rooms: ["F4"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },

  {
    name: "G",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-8.5, -1, 0), size: new Size(4,4,5.5), rooms: ["G1"].map(name => ({ name, size: standardRoomSize })) },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-8.5, 0, 0), size: new Size(4,4,5.5), rooms: ["G2"].map(name => ({ name, size: standardRoomSize })) },
      { name: "2.", size: standardFloorSize, level: 3, position: new Position(-8.5, 1, 0), size: new Size(4,4,5.5), rooms: ["G3"].map(name => ({ name, size: standardRoomSize })) },
      { name: "3.", size: standardFloorSize, level: 4, position: new Position(-8.5, 2, 0), size: new Size(4,4,5.5), rooms: ["G4"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },

  {
    name: "HZ",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-7, -1, 10), size: new Size(13,3,10), rooms: ["4d09", "8d09", "vb03", "8d10", "8d12", "8d11", "8d04", "8d05", "8d06"].map(name => ({ name, size: standardRoomSize })) },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-7, 0, 10), size: new Size(13,3,10), rooms: ["Bibliothek 1", "Bibliothek 2", "N1", "N2"].map(name => ({ name, size: standardRoomSize })) },
      { name: "OG", size: standardFloorSize, level: 3, position: new Position(-7, 1, 10), size: new Size(13,3,10), rooms: ["N5", "N6", "N7", "N8", "N9"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },
  
  {
    name: "Bio",
    floors: [
      { name: "EG", size: standardFloorSize, level: 1, position: new Position(-14, 0, -17), size: new Size(7,1,7), rooms: ["N10", "N11"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },
  
  {
    name: "GUZ",
    floors: [
      { name: "UG", size: standardFloorSize, level: 1, position: new Position(-4, -1, 33), size: new Size(7,5,12), rooms: [] },
      { name: "EG", size: standardFloorSize, level: 2, position: new Position(-4, 0, 33), size: new Size(7,5,12), rooms: [] },
      { name: "2.", size: standardFloorSize, level: 3, position: new Position(-4, 1, 33), size: new Size(7,5,12), rooms: [] },
      { name: "3.", size: standardFloorSize, level: 4, position: new Position(-4, 2, 33), size: new Size(7,5,12), rooms: [] },
      { name: "4.", size: standardFloorSize, level: 5, position: new Position(-4, 3, 33), size: new Size(7,5,12), rooms: [] }
    ]
  },
  
  {
    name: "Mensa",
    floors: [
      { name: "EG", size: standardFloorSize, level: 1, position: new Position(-16, 0, 29), size: new Size(10,2,10), rooms: ["Cafeteria"].map(name => ({ name, size: standardRoomSize })) },
      { name: "OG", size: standardFloorSize, level: 2, position: new Position(-16, 1, 29), size: new Size(10,2,10), rooms: ["Mensa"].map(name => ({ name, size: standardRoomSize })) }
    ]
  },
  
  {
    name: "ZMBP",
    floors: [
      { name: "UG 2", size: standardFloorSize, level: 1, position: new Position(6, -2, 19), size: new Size(8,6,12), rooms: [] },
      { name: "UG 1", size: standardFloorSize, level: 2, position: new Position(6, -1, 19), size: new Size(8,6,12), rooms: [] },
      { name: "EG", size: standardFloorSize, level: 3, position: new Position(6, 0, 19), size: new Size(8,6,12), rooms: [] },
      { name: "4.", size: standardFloorSize, level: 4, position: new Position(6, 1, 19), size: new Size(8,6,12), rooms: [] },
      { name: "5.", size: standardFloorSize, level: 5, position: new Position(6, 2, 19), size: new Size(8,6,12), rooms: [] },
      { name: "6.", size: standardFloorSize, level: 6, position: new Position(6, 3, 19), size: new Size(8,6,12), rooms: [] }
    ]
  }
  
];
