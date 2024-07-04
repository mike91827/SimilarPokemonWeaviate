import React, { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [weavImageUrl, weavSetImageUrl] = useState('');

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

      setImageUrl(data.file)

      const pokemonResponse = await fetch('/api/WeaviatePokemonFinder');
      const result = await pokemonResponse.json();
      
      if (result.success) {
        const timestamp = Date.now();
        weavSetImageUrl(`/uploads/result.jpg?timestamp=${timestamp}`);
      } else {
        console.error('Error Fetching Pokemon:', result.error);
      }
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
     
      {imageUrl && (
        <div>
          <h2>This Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

      )}

      {weavImageUrl && (
        <div>
          <h2>Looks like this Pokemon:</h2>
          <img src={weavImageUrl} alt="Pokemon" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
