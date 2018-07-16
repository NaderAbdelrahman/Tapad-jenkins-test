const md = require('markdown-it')();
const fs = require('fs');

fs.readFile('README.md', 'utf8', (err, fileContent) => {

    if (err) throw err;

    fs.writeFile('README.html', md.render(fileContent), (err) => {
        if (err) throw err;
    })

});