import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingForm } from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse multipart/form-data
    const form = new IncomingForm();
    
    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Reconstruct FormData for pump.fun
    const formData = new FormData();

    // Add text fields
    for (const [key, value] of Object.entries(fields)) {
      const fieldValue = Array.isArray(value) ? value[0] : value;
      if (fieldValue) {
        formData.append(key, String(fieldValue));
      }
    }

    // Add files
    for (const [key, fileArray] of Object.entries(files)) {
      const fileList = Array.isArray(fileArray) ? fileArray : [fileArray];
      for (const file of fileList) {
        if (file && file.filepath) {
          const fs = await import('fs');
          const fileBuffer = fs.readFileSync(file.filepath);
          const blob = new Blob([fileBuffer], { type: file.mimetype || 'application/octet-stream' });
          formData.append(key, blob, file.originalFilename || 'file');
        }
      }
    }

    // Forward to pump.fun
    const response = await fetch('https://pump.fun/api/ipfs', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pump.fun API error:', errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
