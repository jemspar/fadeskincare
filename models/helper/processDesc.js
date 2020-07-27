const fs = require('fs').promises;
const md = require('markdown').markdown;

async function processDescription(path) {
  
  
    // markd = fs.readFile(__dirname + "/../../public/" + path, 'utf8')
    // .then(
    //     buf => buf
    // )
    // .catch(err => {console.log(err)});
  
    // let markup = md.toHTML(markd);
    // return markup;
    // return markd;
    const dataPromise = fs.readFile(__dirname + "/../../public/" + path, 'utf8');
    // need to be in an async function
    await dataPromise;
    return md.toHTML(dataPromise);
  
  }

console.log(processDescription('text/wakeup_oil_desc.md'));