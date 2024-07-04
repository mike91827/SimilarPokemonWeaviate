import { readdirSync } from 'fs';
import path from 'path';
import fs from 'fs';
import weaviate from 'weaviate-ts-client';

async function addAllImages(client) {
    console.log("starting to add images")
    const imgFiles = readdirSync(process.cwd(),'pages/kaggle/pokemon')
    imgFiles.map(async (imgFile) => {

        const fileData = fs.readFileSync(path.join(process.cwd(), 'pages', 'kaggle', 'pokemon', imgFile));

        const b64 = fileData.toString('base64');
        await client.data.creator()
            .withClassName('Pokemon')
            .withProperties({
                image: b64,
                text: 'pokemon',
            })
            .do()
        console.log("Added image: ", imgFile)
    })
}

async function main() {

    const client = weaviate.client({
        scheme: 'http',
        host: 'localhost:8080',
    });


    try {
        
        await addAllImages(client)
        console.log('Schema added successfully');
    } catch (error) {
        console.error('Error adding schema:', error);
    }
}

main();