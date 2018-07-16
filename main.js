const md = require('markdown-it')();
const fs = require('fs');

fs.readFile('README.md', 'utf8', (err, fileContent) => {
    if (err) throw err;

    const [ metadata, content ] = fileContent.split(`${ METADATA_SEPARATOR }\n`);
    // console.log(metadata);

    fs.writeFile('README.html', md.render(content), (err) => {
        if (err) throw err;
        // console.log(./README.html);
    })
});