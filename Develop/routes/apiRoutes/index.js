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
        JSON.stringify({note: notesArr})
    );
    return note
}
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes);
    res.json(note);
})
module.exports = router;