import { readdirSync } from 'fs';
import path from 'path';
import fs from 'fs';

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