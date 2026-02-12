const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Ensure keys are loaded from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Check if Cloudinary is properly configured
const isCloudinaryConfigured = () => {
  return process.env.CLOUDINARY_CLOUD_NAME &&
         process.env.CLOUDINARY_API_KEY &&
         process.env.CLOUDINARY_API_SECRET;
};

// Try to use CloudinaryStorage if available and configured
let storage;
try {
  if (isCloudinaryConfigured()) {
    const CloudinaryStorage = require('multer-storage-cloudinary');
    if (CloudinaryStorage && typeof CloudinaryStorage === 'function') {
      storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
          return {
            folder: 'pwanystay_properties',
            format: 'webp',
            transformation: [
              { width: 1200, height: 800, crop: 'fill', gravity: 'auto' },
              { quality: 'auto', fetch_format: 'auto' }
            ],
            public_id: `prop-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          };
        },
      });
    } else {
      throw new Error('CloudinaryStorage is not a constructor');
    }
  } else {
    throw new Error('Cloudinary not configured');
  }
} catch (err) {
  console.warn('Cloudinary not available, using local storage:', err.message);
  // Fallback to local storage
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `prop-${Date.now()}-${Math.floor(Math.random() * 1000)}-${file.originalname}`);
    },
  });
}

module.exports = storage;