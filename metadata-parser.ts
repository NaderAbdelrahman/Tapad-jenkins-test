const fs = require('fs-extra'),
    md5File = require('md5-file'),
    METADATA_SEPARATOR = "---";

export function parse(file) {
    return new Promise(async (resolve, reject) => {
        let fileContent = await fs.readFile(file, 'utf8');
        // Separating metadata from md content, from the .md file
        const [metadata, content] = fileContent.split(`${ METADATA_SEPARATOR }`);

        // provided metadata
        const parsedMetadata = metadata.split("\n").reduce((accum, line) => {

            const [key, data] = line.split(":");

            if (!data) {
                // This is a line of the description, so we should add it to the existing description
                accum.description += ` ${ key.trim() }`;
            }

            // Don't add anything to metadata if key is not part of metadata
            else if (!accum.hasOwnProperty(key)) { /* noop */ }

            else if (Array.isArray(accum[key])) {
                accum[key] = data.split(', ').map((val) => val.trim());
            }

            else {
                accum[key] = data.trim();
            }
            return accum;
        }, {
            title: "",
            keywords: [],
            auth: [],
            description: "",
            path: "",
            hashPath: ""
        });

        // computed metadata
        parsedMetadata.path = file.split(".").slice(0, -1);
        parsedMetadata.path += ".html";

        md5File(file, (err, hash) => {
            parsedMetadata.hashPath = [...file.split('.').slice(0, -1), hash, 'html'].join('.');
            resolve(parsedMetadata);
            reject(err);
        });
    });
}