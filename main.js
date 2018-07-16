const md = require('markdown-it')();
const fs = require('fs');
const opn = require('opn');
const taImage = require('./taImage');

const METADATA_SEPARATOR = "~~~~";

fs.readFile('sample.md', 'utf8', (err, fileContent) => {
    if (err) throw err;

    const [ metadata, content ] = fileContent.split(`${ METADATA_SEPARATOR }\n`);
    console.log(metadata);

    md.inline.ruler.before('image', 'taImage', taImage); // give taImage priority over image

    fs.writeFile('sample.html', md.render(content), (err) => {
        if (err) throw err;

        opn('./sample.html');
    })
});