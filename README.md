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
| `level`    | `number`         | Ebene im Gebäude (1 = unterste Ebene, höher = weiter oben) |
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
| `material` | `THREE.Material` | Materialobjekt (Three.js) |
| `mesh`     | `THREE.Mesh`     | Meshobjekt (Three.js) |

---

## 🔹 Size-Objekt
Definiert die Dimensionen eines Stockwerks oder Raumes.

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

## 🔹 Beispiel (aus `buildingData.js`)
```js
{
    name: "Gebäudename",
    floors: 
    [
      { 
        name: "Stockwerkname",
        size: new Size(3, 1, 6),
        level: 1,
        position: new Position(0, 0, 0),
        size: new Size(3,10,6),
        rooms: 
        [
          { 
            name: "1a28",
            size: new Size(1, 1, 1)
          },
          { 
            name: "1a29",
            size: new Size(1, 1, 1)
          }
        ]
      }
    ]
  },
```
---

## 🔹 Aktueller Stand
### Gebäude A:
- Etagen 13/13 fertig.
### Gebäude B:
- Etagen 10/10 fertig.
### Gebäude C:
- Etagen 10/10 fertig.
### Gebäude D:
- Etagen 9/9 fertig.
### Gebäude E:
- Etagen 11/? fertig.
### Gebäude F:
- Etagen 4(2)/? fertig.
### Gebäude G:
- Etagen 3(4)/? fertig.
### Gebäude HZ:
- Etagen ?/3 fertig.
### Gebäude Bio:
- Etagen 1/? fertig.
### Gebäude GUZ:
- Etagen 4(5)/? fertig.
### Gebäude ZMBP:
- Etagen 6/? fertig.
### Gebäude Mensa:
- Etagen 2/2 fertig.

