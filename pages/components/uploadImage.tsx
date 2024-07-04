import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [weavImageUrl, weavSetImageUrl] = useState('');
  let counter =1;
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      // console.log("OLIO")
      // const base64Image = `data:image/jpeg;base64,${data.file}`;
      // console.log('base64', data.file)
      //setImageUrl(base64Image);
     setImageUrl(data.file)
      /*
      const data = await response.json();
      
      setImageUrl(`/uploads/${data.file}`);
      */

      const pokemonResponse = await fetch('/api/WeaviatePokemonFinder');
      const result = await pokemonResponse.json();
          console.log("got pokemon result")
          if (result.success) {
            console.log('success')
            counter+=1
            if (counter%2==0){
              weavSetImageUrl('/uploads/result2.jpg');
            } else {
              weavSetImageUrl('/uploads/result.jpg');
            }
            const timestamp = Date.now(); // or use a random string generator
            weavSetImageUrl(`/uploads/result.jpg?timestamp=${timestamp}`);
            //weavSetImageUrl('/uploads/result.jpg');
           
            console.log("counter", counter)
          } else {
            console.error('Error Fetching Pokemon:', result.error);
          }
        
      // const fetchImageData = async () => {
      //   try {
         
      //     const response = await fetch('/api/uploadImage');
          
      //     const result = await response.json();
      //     if (result.success) {
      //       console.log("bayleaf", result.data)
      //       weavSetImageUrl(result.data);
      //     } else {
      //       console.error('Error:', result.error);
      //     }
      //   } catch (error) {
      //     console.error('Fetch error:', error);
      //   }
      // };
  
      // fetchImageData();

    } catch (error) {
      console.error('Error occured:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <h1>hello world</h1>
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        
      )}
      
       <h1>hello world</h1>
       
       {weavImageUrl && (
        <div>
          <h2>Looks like this Pokemon:</h2>
          <img src={weavImageUrl} key={counter} alt="Pokemon" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        
      )}

    </div>
  );
};

export default UploadForm;
