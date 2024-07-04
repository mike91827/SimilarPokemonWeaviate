import { readFileSync, readdirSync, writeFileSync } from 'fs';
import path from 'path';
import weaviate, { ApiKey } from 'weaviate-ts-client';
import fs from 'fs';

export default async function handler(req, res) {

  console.error("ratatiou")
  const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
    // Uncomment and replace with your Weaviate endpoint and API key
    // scheme: 'https',
    // host: 'your-sandbox-url',
    // apiKey: new ApiKey('your-api-key'),
    // headers: { 'X-OpenAI-Api-Key': 'your-openai-api-key' },
  });

  console.error("nope", client)
  try {
    const schemaRes = await client.schema.getter().do();
    console.log('schemasRes', schemaRes)
    /*
    const schemaRes = await client.schema.getter().do();
    

    const schema = {
      class: 'Image',
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
    };*/


    




    console.log('reading cat')
    const imagePath = path.join(process.cwd(), 'pages', 'img', 'cat.jpg');
    console.log('got cat')
    const img = readFileSync(imagePath);
    const b64 = Buffer.from(img).toString('base64');
    console.error("hot path")

    // const ress = await client.data.creator()
    //   .withClassName('Image')
    //   .withProperties({ image: b64, text: 'random images' })
    //   .do();

    // const imgFiles = readdirSync('pages/img')
    // const imgFiles = readdirSync('pages/kaggle/pokemon')
    //console.log("all files", imgFiles)


    //await deleteObjectsFromWeaviate(client)
    //await addAllImages(client)

    // const objects = await client.graphql.get()
    // .withClassName('Image')
    // .withFields['image']
    // .withLimit(500).do()
    // console.log('saints2,', objects)

    // const addAllImages = imgFiles.map(async (imgFile) => {
    //     // const b64 = toBase64(path.join(process.cwd(), 'pages', 'img', imgFile))

    //     // const fileData = fs.readFileSync(path.join(process.cwd(), 'pages', 'img', imgFile));
    //     const fileData = fs.readFileSync(path.join(process.cwd(), 'pages','kaggle', 'pokemon', imgFile));
    //     // Convert binary data to base64 string
    //     const b64 = fileData.toString('base64');


    //     await client.data.creator()
    //     .withClassName('Image')
    //     .withProperties({
    //         image: b64,
    //         text: imgFile.split('.')[0].split('_').join(' ')
            
    //     })
    //     .do()
    // })
    console.error('Hello')

    //this is important for adding all the images
    //await Promise.all(addAllImages)


    console.log("got all images")



    // const objects = await client.graphql
    // .get()
    // .withClassName('Image')
    // .withFields('image')
    // .do();

    

   

    const test = Buffer.from(readFileSync('pages/whitedressgirlsitting.jpg')).toString('base64')

    //console.log("toilet", await client.graphql.get()
    //.withClassName('Image').withFields('image').withNearImage({ image: test })).withLimit(1)

    console.log("DADADA", await client.graphql.get()
    .withClassName('Memes').withFields('image').do())
    //console.log('zazaza', )
    const temps= await client.graphql.get()
    .withClassName('Image').withFields('image').withNearImage({ image: test }).do()
    console.log("yAyAyA", temps.data)
    const count = await client.graphql.aggregate()
  .withClassName('Image')
  .withFields('meta { count }')
  .do();
console.log("Image Count:", count.data.Aggregate.Image[0]);

    const closestImage = await client.graphql.get()
        .withClassName('Image')
        .withFields('image')
        .withNearImage({ image: test })
        .withLimit(1)
        .do()

    console.error("finished")
    console.log('resImage', closestImage.data.Get.Image[0])
    //const answer = closestImage.data
    //console.log("answer",answer)
    const answer = closestImage.data.Get.Image[0].image
    // writeFileSync('./result.jpg', answer, 'base64')
    writeFileSync('./public/uploads/result.jpg', answer, 'base64')
    res.status(200).json({ success: true, data: answer});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

async function addAllImages(client){
  const imgFiles = readdirSync('pages/kaggle/pokemon')
  imgFiles.map(async (imgFile) => {
    // const b64 = toBase64(path.join(process.cwd(), 'pages', 'img', imgFile))
    console.log("we are adding: ", imgFile)
    // const fileData = fs.readFileSync(path.join(process.cwd(), 'pages', 'img', imgFile));
    const fileData = fs.readFileSync(path.join(process.cwd(), 'pages','kaggle', 'pokemon', imgFile));
    // Convert binary data to base64 string
    const b64 = fileData.toString('base64');


    await client.data.creator()
    .withClassName('Image')
    .withProperties({
        image: b64,
        text: 'pokemon'
        //text: imgFile.split('.')[0].split('_').join(' ')
        
    })
    .do()
    //console.log("Added image: ", imgFile)
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