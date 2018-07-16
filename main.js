const md = require('markdown-it')();
const fs = require('fs');
const mdFile = require('./README.md');

fs.readFile('README.md', 'utf8', (err, fileContent) => {

    if (err) throw err;

    fs.writeFile('README.html', md.render(mdFile), (err) => {
        if (err) throw err;
    })

});