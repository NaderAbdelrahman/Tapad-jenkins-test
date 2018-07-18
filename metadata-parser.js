const fs = require('fs'),
    md5File = require('md5-file'),
    METADATA_SEPARATOR = "---";
exports.parse = function (file, cb){
    fs.readFile(file, 'utf8', (err, fileContent) => {
        if (err) throw err;
        let parsedMetadata = {
            title: "",
            keywords: [],
            auth: [],
            description: "",
            path: "",
            hashPath:""
        };

        // Seperating metadata from md content, from the .md file
        const [ metadata, content ] = fileContent.split(`${ METADATA_SEPARATOR }`);


        // provided metadata
        metadata.split("\n").forEach((line) => {

            const [ key, data ] = line.split(":");

            if (!data) {
                // This is a line of the description, so we should add it to the existing description
                parsedMetadata.description += ` ${ key.trim() }`;
                return;
            }

            // Don't add anything to metadata if key is not part of metadata
            if (!parsedMetadata.hasOwnProperty(key)) {
                return;
            }

            if (Array.isArray(parsedMetadata[key])) {
                parsedMetadata[key] = data.split(', ').map((val) => val.trim());
                return;
            }

            parsedMetadata[key] = data.trim();
        });

        // computed metadata
        parsedMetadata.path = file.split(".").slice(0, -1);
        parsedMetadata.path += ".html";

        md5File(file, (err, hash) => {
            parsedMetadata.hashPath = [ ...file.split('.').slice(0, -1), hash, 'html' ].join('.');
            cb(parsedMetadata, content);
        });
    });
};
