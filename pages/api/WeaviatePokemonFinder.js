import { readFileSync, writeFileSync } from 'fs';
import weaviate from 'weaviate-ts-client';

export default async (req, res, file) => {

  try {

    const client = weaviate.client({
      scheme: 'http',
      host: 'localhost:8080',
    });

    const inputImage = Buffer.from(readFileSync('public/uploads/input.jpg')).toString('base64')
    const closestImage = await client.graphql.get()
      .withClassName('Pokemon')
      .withFields('image')
      .withNearImage({ image: inputImage })
      .withLimit(1)
      .do()

    const answer = closestImage.data.Get.Pokemon[0].image
    writeFileSync('./public/uploads/result.jpg', answer, 'base64')

    res.status(200).json({ success: true, data: answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }

};







