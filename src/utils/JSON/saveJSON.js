const fs = require("fs").promises;
async function saveJSON(jsonData) {
    console.log('~ saveJSON');
    try {
        // Write the new data to the file
        await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));

        console.log("✅ Datei erfolgreich gespeichert!");
    } catch (err) {
        console.error("❌ Fehler beim Speichern:", err);
        throw new Error('Fehler beim Lesen der Datei!');
    }
}

module.exports = { saveJSON };