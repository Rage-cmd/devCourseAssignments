const fs = require("fs")

function modifyText(text) {
    console.log("Modifying the data");

    let newText = text.split(' ');
    newText = newText.filter((data) => {return data != ''});
    newText = newText.join(' ');

    console.log(newText)
}

fs.readFile('que1.txt','utf-8',(err,data) => {
    let text;
    if(err) {
        console.log(err);
        return;
    }
    console.log(data)
    text = data;
    console.log("Data has been read");
    modifyText(text);
})

// fs.writeFile('ques1.txt',newText);
