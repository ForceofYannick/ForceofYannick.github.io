# 📘 Roomfinder Dokumentation

Dieses Dokument erklärt die Datenstruktur für Gebäude, Stockwerke und Räume, die in `buildingData.js` hinterlegt und im Browser über `index.js` und `index.html` visualisiert werden.

---

## 🔹 Building-Objekt
Ein Gebäude wird durch ein `building`-Objekt beschrieben.

### Eigenschaften
| Name     | Typ       | Beschreibung |
|----------|-----------|--------------|
| `name`   | `string`  | Name des Gebäudes (z. B. `"A"`) |
| `floors` | `Floor[]` | Liste der enthaltenen Stockwerke |

---

## 🔹 Floor-Objekt
Ein Stockwerk wird durch ein `floor`-Objekt beschrieben.

### Eigenschaften
| Name       | Typ              | Beschreibung |
|------------|------------------|--------------|
| `name`     | `string`         | Name/Bezeichnung des Stockwerks (z. B. `"EG"`, `"3."`) |
| `level`    | `number`         | Ebene im Gebäude (-1 = 1.UG, 0 = EG, 1= höher = weiter oben). Wird für interne Sortierung der Stockwerke verwendet, damit Stockwerksnamen individualisiert werden können  |
| `position` | `Position`       | Position des Stockwerks im 3D-Raum |
| `size`     | `Size`           | Dimensionen des Stockwerks |
| `rooms`    | `Room[]`         | Liste der Räume in diesem Stockwerk |
| `geometry` | `THREE.Geometry` | Geometrieobjekt (Three.js) für die Darstellung |
| `material` | `THREE.Material` | Materialobjekt (Three.js) für die Darstellung |
| `mesh`     | `THREE.Mesh`     | Meshobjekt (Three.js), kombiniert Geometrie und Material |

---

## 🔹 Room-Objekt
Ein Raum wird durch ein `room`-Objekt beschrieben.

### Eigenschaften
| Name       | Typ              | Beschreibung |
|------------|------------------|--------------|
| `name`     | `string`         | Raumbezeichnung (z. B. `"3a28"`) |

---

## 🔹 Size-Objekt
Definiert die Dimensionen eines Stockwerks.

### Eigenschaften
| Name     | Typ            | Beschreibung |
|----------|----------------|--------------|
| `width`  | `number`       | Breite |
| `height` | `number`       | Höhe |
| `depth`  | `number`       | Tiefe |

---

## 🔹 Position-Objekt
Definiert die Position im 3D-Raum (Three.js).

### Eigenschaften
| Name | Typ            | Beschreibung |
|------|----------------|--------------|
| `x`  | `number`       | X-Koordinate |
| `y`  | `number`       | Y-Koordinate |
| `z`  | `number`       | Z-Koordinate |

---

## 🔹 Beispiel für `buildingData.js`
```js
{
    name: "Gebäudename",
    floors: 
    [
      { 
        name: "Stockwerkname",
        level: 1,
        position: new Position(0, 0, 0),
        size: new Size(3, 10, 6),
        rooms: 
        [
          {
            name: "1a28"
          },
          {
            name: "1a29"
          }
        ]
      }
    ]
  },
```
Sind mehrere Räume in einem Stockwerk, kann auch folgendes für ein floor Objekt geschrieben werden:
```js
floors:
[
  { 
    name: "Stockwerkname",
    level: 1,
    position: new Position(0, 0, 0),
    size: new Size(3, 10, 6),
    rooms:
    ["5a10", "5a28", "5a35", "5a45"].map(name => ({ name }))
  },
]
```

---

## 🔹 Aktueller Stand

## Gebäude A
- UG: 1a28
- EG: 2a28
- 3.: a3m04, 3a04, 3a11, 3a28, 3a32, 3m04
   - > a3m04 = 3m04 ?
- 4.: 4a07, 4a32
- 5.: 5a10, 5a28, 5a35, 5a45
- 6.: a04, a32, a38, a44
- 7.: 7a04, 7a11, 7a32, 7a34, 7a40
- 8.: 9a04, 9a32, 9a43
  - > no typo, rooms actually have prefix 9a
- 9.: 9a04, 9a07, 9a32, 9a35, 9a44
- 10.: 10a14, 10a28, 10a34, 10a42, 10a44
- 11.: 11a04, 11a34
- 12.: 12a04, 12a28, 12a40
- 13.: 13a34

## Gebäude B
- UG: 1b01
- EG: *?*
- 3.: a38, a35, a08, a11
- 4.: a35, a38
- 5.: a35, a32
- 6.: a26, a34, a29, a32
- 7.: a10, a14, a20, p10, a23, a07, p07
- 8.: a08, a23, a26, a34, p17
- 9.: b9n22, a44, a18
- 10.: p17, p22, p26, p29, p32, a16, a20, a23, a29, a32, a38, r38

## Gebäude C
- UG 2: *?*
- UG 1: A25, A29, p25, p43, p23, c02a17, h11, h33, n03
- EG: p25, p22, N14, N15, N16
- 4.: p34, p39, a42, a33, a39, p36, a36, c04h33
- 5.: p22, p28, p40, p46, a26, a40, a23, a08, a14, p08, a23, s6, s7, s8
- 6.: a40, a14, a29, a46, a08, a11, p19, a11, p16, p25, s9, s10, s11
- 7.: a04, a35, a32
- 8.: p17, a41, a32
- 9.: a34, c10a32, g03, h33, h36, a19, a16, c9g09, c9a03
- 10.: a16, a34, a32, a23, p13, p17, c10h33

## Gebäude D
- UG: *?*
- EG: *?*
- 3.: *?*
- 4.: d4h07, d4a19
- 5.: *?*
- 6.: *?*
- 7.: *?*
- 8.: d8h33
- 9.: *?*

## Gebäude E
- UG: *?*
- EG: 2p31, 2p07, 4p25, 2a14
- 3.: N12, 3r25, 3p32, 3a22, 9a22, 9a03, 3a22, 3a25
- 4.: 4p43, 4p07, 4p34, 4p22, 4p10
- 5.: 5a38, 5a28, 5a14, 5p13, 5p10, 5a32, 5p19, 5p25, 5p22
- 6.: 6p22, 6p25, 6p37, 6q16, 6q34, 6r10
- 7.: 7a03, 7a14, 7a28, 7a30, 7p03, 7p07, 7p22
- 8.: 8p03, 8p07, 8p10, 8p13, 8p16, 8p19, 8p22, 8p25, 8p34, 8p37
- 9.: 9a14, 9a29, 9a41, 9p22, 9p25, 9p32
- 10.: 10a23, 10a41, 10p13, 10p14, 10p28, 10p31
- 11.: Tierhaltung

## Gebäude F
- ?

## Gebäude G
- ?

## Gebäude H
- EG: h2c14
> Gebäude H = Gebäude G ?

## Gebäude HZ
- UG: 4d09, vb03, vbn3, 8d04, 8d05, 8d06, 8d09, 8d10, 8d11, 8d12
   - > vbn3 = vb03 ?
- EG: Bibliothek 1, Bibliothek 2, N1, N2, N3, N4
- OG: N5, N6, N7, N8, N9

## Gebäude Botanik
- EG: N10, N11

## Gebäude GUZ
- UG: *?*
- EG: *?*
- 2.: *?*
- 3.: *?*
- 4.: *?*
- 5.: *?*
- 6.: *?*
- ?

## Gebäude Mensa
- EG: Cafeteria
- OG: Mensa

## Gebäude ZMBP
- ?
