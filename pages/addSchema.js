import weaviate from 'weaviate-ts-client';

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
        
        console.log('Schema added successfully');
    } catch (error) {
        console.error('Error adding schema:', error);
    }
}

main();