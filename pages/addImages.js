import { readdirSync } from 'fs';
import path from 'path';
import fs from 'fs';
import weaviate from 'weaviate-ts-client';

async function addAllImages(client) {
    console.log("starting to add images")
    const imgFiles = readdirSync('pages/kaggle/pokemon')
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

async function addPokemonSchema(client) {
    const schemaConfig = {
        class: 'Pokemon',
        vectorizer: 'img2vec-neural',
        vectorIndexType: 'hnsw',
        moduleConfig: {
            'img2vec-neural': {
                imageFields: ['image'],
            },
        },
        properties: [
            { name: 'image', dataType: ['blob'] },
            { name: 'text', dataType: ['string'] },
        ],
    };

    await client.schema.classCreator().withClass(schemaConfig).do();
}

async function main() {

    const client = weaviate.client({
        scheme: 'http',
        host: 'localhost:8080',
    });


    try {
        await addPokemonSchema(client);
        await addAllImages(client)
        console.log('Schema added successfully');
    } catch (error) {
        console.error('Error adding schema:', error);
    }
}

main();