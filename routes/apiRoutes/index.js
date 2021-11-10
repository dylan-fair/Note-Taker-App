const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notes = require('../../db/db');
router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
})
function createNewNote(body, notesArr){
    const note = body;
    notesArr.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArr, null, 2)
    )
    return note
}
function deleteNote(id, notesArr){
    for(let i = 0; i < notesArr.length; i++){
        if(notesArr[i].id === id){
            notesArr.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../../db/db.json'),
                JSON.stringify(notesArr, null, 2)
            );
            return;
        }
    }
}
router.post("/notes", function(req, res) {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
});
router.delete("/notes/:id", (req, res) => {
    deleteNote(req.params.id, notes);
    res.json('Deleted');
});
module.exports = router;