import React from 'react';
import UploadForm from './components/uploadImage';

const containerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column', // Arrange items in a column
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#4A90E2',
    fontFamily: 'Arial, sans-serif',
    padding: '20px', // Adjust padding
    boxSizing: 'border-box', // Include padding in element's total width and height
  },
  imageContainer: {
    marginBottom: '20px', // Space between image and content
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  innerContainer: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#fff', // White color for heading text
  },
};

export default function Home() {
  return (
    <div style={containerStyles.container}>
      <div style={containerStyles.imageContainer}>
        <img src={'uploads/weaviate.jpg'} alt="Weaviate" style={containerStyles.image} />
      </div>
      <div style={containerStyles.innerContainer}>
        <h1 style={containerStyles.heading}>
          Upload a Picture! We will tell you what Pokemon it looks like!
        </h1>
        <UploadForm />
      </div>
    </div>
  );
}
