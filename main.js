const md = require('markdown-it')(),
    fs = require('fs-extra'),
    walk = require('walk'),
    walker = walk.walk('articles', {followLinks: false}),
    metadataParser = require('./metadata-parser'),
    md5File = require('md5-file'),
    METADATA_SEPARATOR = "---";

let files = [];


const metadata = {
    articles: [],
    assets: []
};

function metadataStorer(files, callback){
    files.forEach((file) => {
        metadataParser.parse(file, (parsedMetadata,) => {
            metadata.articles.push(parsedMetadata);
            if (metadata.articles.length === files.length) {
                callback();
            }
        });
    })
}
    walker.on('file', (root, stat, next) => {
        // Only keep files with .md extension
        const splitName = stat.name.split('.');
        if (splitName[splitName.length - 1] === "md") {
            files.push(root + '/' + stat.name);
        }
        next();
    });
    walker.on('end', () => {
        metadataStorer(files, () => {
            fs.mkdirp(`GCS/metadata/`, () => {
                fs.writeFile(`GCS/metadata/0.0.1.json`, JSON.stringify(metadata, null, 2));
            });
            files.forEach((file) => {
                let tmp = file.replace('.md', '');
                fs.readFile(`${tmp}.md`, 'utf8', (err, fileContent) => {

                    if (err) throw err;

                    const path = file.split("/").slice(0, -1).join("/");

                    fs.mkdirp(`GCS/${ path }/`, () => {
                        const [metadata, content] = fileContent.split(`${ METADATA_SEPARATOR }`);
                        md5File(file, (err, hash) => {
                            if (err) throw err;
                            file = file.replace('.md', '');
                            fs.writeFile(`GCS/${ file}.${hash}.html`, md.render(content), (err) => {
                                if (err) throw err;
                                console.log(hash);
                            });
                        });
                    });
                });
            });
        });
    });
