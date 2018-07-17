const md = require('markdown-it')();
const fs = require('fs');

fs.readFile('*.md', 'utf8', (err, fileContent) => {

    if (err) throw err;

    fs.writeFile('*.html', md.render(fileContent), (err) => {
        if (err) throw err;
    })

});