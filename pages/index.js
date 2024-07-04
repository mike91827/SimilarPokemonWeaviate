import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import confusedBabyImage from './confusedBaby.jpg';
import UploadForm from './components/uploadImage';

export default function Home() {
 

  useEffect(() => {
    // const fetchImageData = async () => {
    //   try {
       
    //     const response = await fetch('/api/uploadImage');
        
    //     const result = await response.json();
    //     if (result.success) {
    //       setImageData(result.data);
    //     } else {
    //       console.error('Error:', result.error);
    //     }
    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }
    // };

    // fetchImageData();
  }, []);

  return (
    <div className={styles.container}>
      <div>
      <h1>Upload a Picture</h1>
      <UploadForm />
    </div>

    </div>
  );
}








// import styles from '../styles/Home.module.css';
// import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';
// import fetch from 'node-fetch';
// import { useState, useEffect } from 'react';
// import { Head } from 'next/document';



// const client = weaviate.client({
//   scheme: 'http',
//   host: 'localhost:8080',
//   // scheme: 'https',
//   // host: 'https://my-sandbox-sjj9p761.weaviate.network',  // Replace with your Weaviate endpoint
//   // apiKey: new ApiKey('2ThYSD0u4ydCxWFK0hrgUJ1Ol1t9F9rFSY45'),  // Replace with your Weaviate instance API key
//   // headers: { 'X-OpenAI-Api-Key': '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' },  // Replace with your inference API key
// });

// const schemaRes = await client.schema.getter().do()
// console.log(schemaRes)

// const schema = {
//   'class': 'Image',
//   'vectorizer': 'img2vec-neural',
//   'vectorIndexType': 'hnsw',
//   'moduleConfig': {
//     // 'text2vec-openai': {},
//     // 'generative-openai': {},
//     'img2vec-neural': {
//       'imageFields':[
//           'image'
//       ]
//     }
//   },
//   'properties': [
//       {
//           'name': 'image',
//           'dataType': ['blob']
//       },
//       {
//           'name': 'text',
//           'dataType': ['string']
//       }
//   ]
// }
// //maybe do something like a try block or if it doesnt exist then just do it
// //await client.schema.classCreator().withClass(schema).do();

// const img = readFileSync('./pages/img/babyMeme.jpg')
// const b64 = Buffer.from(img).toString('base64')
// const ress = await client.data.creator()
//   .withClassName('Image')
//   .withProperties(
//     {
//       image: b64,
//       text: 'random images'
//     }
//   )
//   .do();

// export default function Home() {
  
//   return (
//     <div className={styles.container}>
      
//     </div>
//   );
// }
// /*

// <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing <code>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
//         </a>
//       </footer>

//       <style jsx>{`
//         main {
//           padding: 5rem 0;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }
//         footer {
//           width: 100%;
//           height: 100px;
//           border-top: 1px solid #eaeaea;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         footer img {
//           margin-left: 0.5rem;
//         }
//         footer a {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           text-decoration: none;
//           color: inherit;
//         }
//         code {
//           background: #fafafa;
//           border-radius: 5px;
//           padding: 0.75rem;
//           font-size: 1.1rem;
//           font-family:
//             Menlo,
//             Monaco,
//             Lucida Console,
//             Liberation Mono,
//             DejaVu Sans Mono,
//             Bitstream Vera Sans Mono,
//             Courier New,
//             monospace;
//         }
//       `}</style>

//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           font-family:
//             -apple-system,
//             BlinkMacSystemFont,
//             Segoe UI,
//             Roboto,
//             Oxygen,
//             Ubuntu,
//             Cantarell,
//             Fira Sans,
//             Droid Sans,
//             Helvetica Neue,
//             sans-serif;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
// */ 