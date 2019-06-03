const fs = require('fs');

const notesFile = 'notes.txt';

// fs.writeFileSync(notesFile, 'This file was created by Node.js!');
fs.appendFileSync(notesFile, 'This file was appended by Node.js!');
