import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import weaviate, { ApiKey } from 'weaviate-ts-client';
import fs from 'fs';
const express = require('express');
const req = express();

//req.get('/api/WeaviatePokemonFinder', async (req, res) => {
export default async (req, res, file) => {
  ///export default async function handler(req, res) {
  try {

   

  
      console.log("fetching pokemon")
      const client = weaviate.client({
        scheme: 'http',
        host: 'localhost:8080',
      });
      console.log("Connected to client")
      // const schemaRes = await client.schema.getter().do();
      // console.log("schemaRed", schemaRes)

      // const schema = {
      //   class: 'Pokemon',
      //   vectorizer: 'img2vec-neural',
      //   vectorIndexType: 'hnsw',
      //   moduleConfig: {
      //     'img2vec-neural': {
      //       imageFields: ['image'],
      //     },
      //   },
      //   properties: [
      //     { name: 'image', dataType: ['blob'] },
      //     { name: 'text', dataType: ['string'] },
      //   ],
      // };

      
      //await addPokemonSchema(client)
      //await addAllImages(client);

    const imagePath = path.join(process.cwd(), 'pages', 'img', 'cat.jpg');
    const img = readFileSync(imagePath);
    const b64 = Buffer.from(img).toString('base64');
    
    // const test = Buffer.from(readFileSync('pages/whitedressgirlsitting.jpg')).toString('base64')
    const test = Buffer.from(readFileSync('public/uploads/input.jpg')).toString('base64')
  
    
//     const count = await client.graphql.aggregate()
//   .withClassName('Image')
//   .withFields('meta { count }')
//   .do();
// console.log("Image Count:", count.data.Aggregate.Image[0]);
    // console.log("pokemon", await client.graphql.get()
    // .withClassName('Pokemon').withFields('image').withNearImage({ image: test }).do())
    console.log("starting search")
    const closestImage = await client.graphql.get()
        .withClassName('Pokemon')
        .withFields('image')
        .withNearImage({ image: test })
        .withLimit(1)
        .do()

    console.error("finished", closestImage)
    console.log('resImage', closestImage.data.Get.Pokemon[0])
    //const answer = closestImage.data
    //console.log("answer",answer)y

    const answer = closestImage.data.Get.Pokemon[0].image
    // writeFileSync('./result.jpg', answer, 'base64')
    writeFileSync('./public/uploads/result.jpg', answer, 'base64')
    writeFileSync('./public/uploads/result2.jpg', answer, 'base64')
    res.status(200).json({ success: true, data: answer});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
  
};

async function addPokemonSchema(client){
 
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


async function addAllImages(client){
  console.log("starting to add images")
  const imgFiles = readdirSync('pages/kaggle/pokemon')
  imgFiles.map(async (imgFile) => {
    // const b64 = toBase64(path.join(process.cwd(), 'pages', 'img', imgFile))
    //console.log("we are adding: ", imgFile)
    // const fileData = fs.readFileSync(path.join(process.cwd(), 'pages', 'img', imgFile));
    const fileData = fs.readFileSync(path.join(process.cwd(), 'pages','kaggle', 'pokemon', imgFile));
    // Convert binary data to base64 string
    const b64 = fileData.toString('base64');


    await client.data.creator()
    .withClassName('Pokemon')
    .withProperties({
        image: b64,
        text: 'pokemon',
        //text: imgFile.split('.')[0].split('_').join(' ')
        
    })
    .do()
    console.log("Added image: ", imgFile)
})
}


async function deleteObjectsFromWeaviate(client){

  // await client.batch
  // .objectsBatchDeleter()
  // .withClassName('EphemeralObject')
  // .withWhere({
  //   path: ['name'],
  //   operator: 'Like',
  //   valueText: 'EphemeralObject*',
  // })
  // .do();

  
  console.error('>S>DA>D>ASDfsdfsd')

  
  console.log("classes", await client.schema.getter().do())

  const test = Buffer.from(readFileSync('pages/whitedressgirlsitting.jpg')).toString('base64')

  const objects = await client.graphql.get()
  .withClassName('Image')
  .withFields(['_additional { id }'])
  .do()
  const objects2 = await client.graphql.get()
  .withClassName('Image')
  .withFields(['_additional { id }'])
  .do()

  

  console.log('saints,', objects, objects2)
  
  console.log('kick', await client.graphql.get()
  .withClassName('Image').withFields('image').do() )


  for (const obj of objects.data.Get.Image) {
    const objectId = obj._additional.id;
    console.log('Ohio', obj._additional.id)
    await client.data
    .deleter()
    .withClassName('Image')  
    .withId(objectId)
    .do();
    // await client.data.object.delete({
    //   className: 'Image',
    //   id: objectId,
    // });
    console.log(`Deleted object with ID: ${objectId}`);
  }
}