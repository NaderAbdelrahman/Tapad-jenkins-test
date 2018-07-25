import md from 'markdown-it';
import fs from 'fs-extra';
import walk from 'walk';
import { parse } from './metadata-parser'
import md5File from 'md5-file'
// import Storage = '@google-cloud/storage';
const walker = walk.walk('articles', {followLinks: false});
const METADATA_SEPARATOR: string  = "---";

let files: string[] = [],
    metadataObj: Metadata;

const metadataJSONVar = {
    articles: <any>[],
    assets: <any>[]
};

// const storage: Storage = new Storage({
//     projectId: "tapad-frontend-stg"
// });

// const bucket = storage.bucket("scratch.frontend-stg.tapad.com");

class Metadata {
    constructor(private metadata: any) { }

    versionNumber() {
        let argv = process.argv;
        if (argv.length === 3) {
            argv = argv[2].split("-");
            if(argv[0][0] === "v"){
                argv[0] = argv[0].replace("v", "");
            }
            argv.pop();
            return argv.join(".");
        }
        else if (argv.length === 1) {
            if(argv[0][0] === "v"){
                argv[0] = argv[0].replace("v", "");
                return(argv[0]);
            }
        } else {
            return "0.0.1";
        }
    }

    async metadataJSONPath() {
        const arg = this.versionNumber(),
            localPath = `GCS/metadata/${arg}.json`,
            gcsPath = `metadata/${arg}.json`;

        fs.mkdirp(`GCS/metadata/${arg}`).then(() => {
            this.writeMetadataJSONLocally(localPath, gcsPath);
        })
    }

    writeMetadataJSONLocally(localPath, gcsPath) {
        // metadata = await metadataParser.parse(localPath);
        fs.writeFile(localPath, JSON.stringify(this.metadata, null, 2))
            .then(()=>{
                // upload to GCS, gcsPath
            })
            .catch((err) => {
                console.error(err);
            })

    }
    async populateMetadataJSON(localPath) {
        this.metadata.push(await parse(localPath));
        return new Promise<any>((resolve, reject)=>{
            resolve(this.metadata)
        });
    }

}


class Article {

    constructor(
        private path: string,
        private content: any,
        private metadata: any,
        private hash: string,
        private hashPath: string,
        private html: any

    ){ }

    getFileContent() {
        return new Promise<any>((res, rej) => {
            if (!this.content) {
                fs.readFile(this.path, 'utf8', (err, content) => {
                    if (err) {
                        rej(err);
                    } else {
                        this.content = content;
                        res(content);
                    }
                });
            }

            res(this.content);
        });
    }

    async getMetadata() {
        const file = await this.getFileContent();

        return new Promise((res, rej) => {
            if (!this.metadata) {
                const [ metadata ] = file.split(METADATA_SEPARATOR);
                this.metadata = new Metadata(metadata);
            }

            res(this.metadata);
        });
    }

    async getMarkdownFromContent() {
        const file = await this.getFileContent();

        return new Promise((res, rej) => {
            if (!this.content) {
                const [ _, content ] = file.split(METADATA_SEPARATOR);
                this.content = content;
            }

            res(this.content);
        });
    }

    async computeHash() {
        const file = await this.getFileContent();

        return new Promise((res, rej) => {
            if (this.hash) {
                res(this.hash);
            } else {
                md5File(file, (hash) => {
                    this.hash = hash;
                    res(this.hash);
                });
            }
        });
    }

    async computeHashPath() {
        const hash = await this.computeHash();

        return new Promise((res, rej) => {
            if (!this.hashPath) {
                this.hashPath = `${ this.path.replace('.md', '') }.${ hash }.html`;
            }

            res(this.hashPath);
        })
    }

    toHtml() {
        return new Promise((res, rej) => {
            if (this.html) {
                res(this.html);
            } else {
                md.render(this.content, (html) => {
                    this.html = html;
                    res(this.html);
                });
            }
        })
    }

    async writeHtmlLocally() {
        const html = await this.toHtml();

        return new Promise((res, rej) => {
            fs.writeFile(this.path, html, (err) => {
                if (err) {
                    rej(err);
                } else {
                    res()
                }
            });
        })
    }

    async writeToGcs() {
        const html = await this.toHtml();

        return new Promise((res, rej) => {
            res(false); // todo: interface with GCS
        })
    }
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
    files.forEach(async (file) => {
        metadataJSONVar.articles.push(await parse(file));
        if (metadataJSONVar.articles.length === files.length) {
            metadataObj = new Metadata(metadataJSONVar);
            metadataObj.metadataJSONPath();
        }
    });
});
// ------------------------------------------------------------------------------------------------

// function metadataStorer(files, callback){
//     files.forEach((file) => {
//         metadataParser.parse(file, (parsedMetadata,) => {
//             metadata.articles.push(parsedMetadata);
//             if (metadata.articles.length === files.length) {
//                 callback();
//             }
//         });
//     })
// }
//
// walker.on('file', (root, stat, next) => {
//     // Only keep files with .md extension
//     const splitName = stat.name.split('.');
//     if (splitName[splitName.length - 1] === "md") {
//         files.push(root + '/' + stat.name);
//     }
//     next();
// });
//
// function parseVersionNumberForJSONMetadata() {
//
//     let argv = process.argv;
//     if (argv.length === 3) {
//         argv = argv[2].split("-");
//         if(argv[0][0] === "v"){
//             argv[0] = argv[0].replace("v", "");
//         }
//         argv.pop();
//         argv = argv.join(".");
//     }
//     else if (argv.length === 1) {
//         if(argv[0][0] === "v"){
//             argv[0] = argv[0].replace("v", "");
//         }
//     } else {
//         argv = "0.0.1";
//     }
//
//     const gcsPath = `metadata/${argv}.json`;
//     const localPath = `GCS/${ gcsPath }`;
//
//     writeJSONMetadata(localPath, gcsPath);
//
// }
// function writeJSONMetadata(localPath, gcsPath) {
//     fs.writeFile(localPath, JSON.stringify(metadata, null, 2), () => {
//         // Upload to JSON Metadata GCS Here
//
//         // bucket.upload(localPath, {destination: gcsPath});
//     });
// }
// function makeMetadataDirectory() {
//
//     fs.mkdirp(`GCS/metadata/`, parseVersionNumberForJSONMetadata);
//
//     files.forEach(readFileContents);
// }
//
// function writeHTML(err) {
//     if (err) throw err;
//     // Upload HTML to GCS here
//     // bucket.upload(localPath, {destination: gcsPath});
// }
//
// function readFileContents(file) {
//     const handleHashPath = (err, hash) => {
//         if (err) throw err;
//         file = file.replace('.md', '');
//
//
//         const gcsPath = `${ file }.${ hash }.html`;
//         const localPath = `GCS/${ gcsPath }`;
//
//         fs.writeFile(localPath, md.render(content), writeHTML);
//     };
//
//     const htmlPath = (err, fileContent) => {
//
//         if (err) throw err;
//
//         const path = file.split("/").slice(0, -1).join("/");
//
//         fs.mkdirp(`GCS/${ path }/`, computeHash);
//     };
//
//     const computeHash = () => {
//         const [metadata, content] = fileContent.split(`${ METADATA_SEPARATOR }`);
//         md5File(file, handleHashPath);
//     };
//
//     fs.readFile(file, 'utf8', htmlPath);
// }
//
// walker.on('end', () => {
//     metadataStorer(files, makeMetadataDirectory);
// });
