const express = require('express');
const fs = require('fs');
const moment = require('moment');

const app = express();
const port = 3000;
const folderPath = './textfiles'; // Change this to your desired folder path

app.use(express.json());

// Endpoint to create a text file with the current timestamp
app.post('/createTextFile', (req, res) => {
    const currentTimestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
    const fileName = `${currentTimestamp}.txt`;
    const filePath = `${folderPath}/${fileName}`;
    const fileContent = currentTimestamp;

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Unable to create the text file.' });
        } else {
            res.json({ message: 'Text file created successfully.' });
        }
    });
});

// Endpoint to retrieve a list of all text files in the folder
app.get('/getTextFiles', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Unable to retrieve the text files.' });
        } else {
            const textFiles = files.filter((file) => file.endsWith('.txt'));
            res.json({ textFiles });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});