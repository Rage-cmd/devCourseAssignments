const fs = require('fs');

fs.writeFile('fileToWrite.txt', "Writing some data into the file...", (err, data) => {
    console.log("File has been overwritten, thanks!");
});

console.log("Just after the file has been written to ");