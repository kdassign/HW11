const fs = require('fs');
const path = require('path');

module.exports = app => {

    app.get("/api/notes", function (req, res) {
        noteData = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"))
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

        req.body.id = noteData.length;

        noteData.push(req.body);

        fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteData));
        console.log("saved to json file: ", req.body);
        res.json(noteData);
    });

    app.delete("/api/notes/:id", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        noteData.splice(req.params.id, 1);

        fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteData));
        console.log("delete note", req.params.id);
        res.json(noteData);
    });

    app.get("/api/notes/:id", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
        var note = req.params.id;
        res.JSON(noteData[req.params.id]);
    })


    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
    })

}