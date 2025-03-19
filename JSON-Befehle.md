# 0. JSON data laden

```js
// Read data json file
     let jsonData;
     let rawData;

     try {
         rawData = await fs.readFile("data.json", "utf8");
         jsonData = JSON.parse(rawData);

     } catch (err) {
         console.error("❌ Fehler beim Lesen:", err);
         return;
     }
```
# 0.0. JSON data speichern
```js
        try {
          await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));
          console.log("✅ Datei erfolgreich gespeichert!");
          return;
      } catch (err) {
          console.error("❌ Fehler beim Speichern:", err);
          return;
      }
```


# 1. Zugriff auf Werte
```js
obj.key
```
oder
```js
obj[key]
```

## Beispiel: Wert abrufen
```js
const team = "IBTC";
const player = "Yannick";

const discordID = jsonData.Teams[team].Players[player]["discord-id"];
console.log(discordID);
```

# 2. Prüfen, ob Wert existiert
```js
if (jsonData.Teams?.IBTC?.Players?.Yannick) {
    console.log("Yannick existiert als Spieler!");
}
```

# 3. Wert ändern
```js
jsonData.Teams.IBTC.Players.Yannick.roles = "Admin";
console.log(jsonData.Teams.IBTC.Players.Yannick.roles);
```

# 4. Neuen Spieler zu Team hinzufügen
```js
jsonData.Teams.IBTC.Players["Max"] = {
    "player-name": "Max",
    "discord-id": "123456789012345678",
    "roles": "Support",
    "instagram": "-",
    "tiktok": "-",
    "twitter": "-",
    "twitch": "-",
    "youtube": "-",
    "team": "IBTC"
};

console.log(jsonData.Teams.IBTC.Players.Max);
```

# 5. Spieler aus Team entfernen
```js
delete jsonData.Teams.IBTC.Players.Yannick;
console.log(jsonData.Teams.IBTC.Players.Yannick); // undefined
```

# 6. Durch alle Spieler eines Teams iterieren
```js
for (const player in jsonData.Teams.IBTC.Players) {
    console.log(`Spieler: ${player}`);
}
```
## Falls man Werte des Spielers braucht
```js
for (const [playerName, playerData] of Object.entries(jsonData.Teams.IBTC.Players)) {
    console.log(`${playerName}: ${playerData["discord-id"]}`);
}
```

# 7. Spieler in allen Teams finden
```js
let foundPlayer = null;

for (const team in jsonData.Teams) {
    if (jsonData.Teams[team].Players["Lukas"]) {
        foundPlayer = jsonData.Teams[team].Players["Lukas"];
        console.log(`Lukas ist in Team ${team}`);
        break;
    }
}

if (!foundPlayer) {
    console.log("Lukas wurde nicht in einem Team gefunden.");
}
```
