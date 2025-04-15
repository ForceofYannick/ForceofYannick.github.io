const fs = require("fs").promises;

async function readJSON() {
    console.log('~ readJSON');
    let rawData;
    let jsonData;
    try {
        rawData = await fs.readFile("data.json", "utf8");
        jsonData = JSON.parse(rawData);
    } catch (err) {
        console.error("❌ Fehler beim Lesen:", err);
        throw new Error('Fehler beim Lesen der Datei!');
    }
    return jsonData;
}

module.exports = { readJSON };