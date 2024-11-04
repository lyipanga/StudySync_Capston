// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to handle file uploads
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.uploadDir = './public/uploads'; // Ensure you create an 'uploads' directory
  form.keepExtensions = true; // Keep the file extensions

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    // File details will be available in files.pdf
    res.status(200).json({ message: 'File uploaded successfully', file: files.pdf });
  });
}
