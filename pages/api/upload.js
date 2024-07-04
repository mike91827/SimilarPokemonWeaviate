import formidable from 'formidable';

import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
 
  
  
  const form = formidable({
    multiples: false, // If you want to handle multiple files
    uploadDir: path.join(process.cwd(), 'public/uploads'), // Specify the upload directory
    keepExtensions: true, // Keep file extensions
  });


//   const form = new formidable.IncomingForm();
//   const uploadDir = path.join(process.cwd(), 'public/uploads');
//   form.uploadDir = uploadDir;
//   form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      
      return res.status(500).json({ message: 'Error parsing form data' });
    }
    
   
    const file = files.file; // Get the uploaded file
    console.log("files", file)
    const filepath = file[0].filepath;
    
    fs.readFile(filepath, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error reading file' });
      }

      
      const b64 = data.toString('base64');
      const base64Image = `data:image/jpeg;base64,${b64}`;
  
    
    
    
    const oldPath = file[0].filepath; // Get the temporary path of the file
    
    const newPath = path.join(form.uploadDir, 'input.jpg'); // Set the new path for the file
    // const newPath = path.join(form.uploadDir,file[0].originalFilename); // Set the new path for the file
   
    //this is the code that adds the file
    fs.renameSync(oldPath, newPath);
    
  
    return res.status(200).json({ message: 'File uploaded successfully', file: base64Image });
    });
  });
};
