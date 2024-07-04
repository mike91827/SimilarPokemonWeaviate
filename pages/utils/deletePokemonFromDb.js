import { readFileSync } from 'fs';

async function deleteObjectsFromWeaviate(client) {
    const objects = await client.graphql.get()
        .withClassName('Pokemon')
        .withFields(['_additional { id }'])
        .do()

    for (const obj of objects.data.Get.Image) {
        const objectId = obj._additional.id;

        await client.data
            .deleter()
            .withClassName('Pokemon')
            .withId(objectId)
            .do();

        console.log(`Deleted object with ID: ${objectId}`);
    }
}