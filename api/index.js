const express = require('express');
const app = express();
const PORT = 3001;
const path = require('path');
const cors = require('cors');

app.use(cors())

app.use(express.static('public'));

app.get('/absences', (req, res) => {
    res.sendFile(path.join(__dirname, './json_files/absences.json'));
});

app.get('/members', (req, res) => {
    res.sendFile(path.join(__dirname, './json_files/members.json'));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));