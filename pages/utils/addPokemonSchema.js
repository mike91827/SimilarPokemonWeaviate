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