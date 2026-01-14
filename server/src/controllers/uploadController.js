const path = require('path');
const fs = require('fs');
const multer = require('multer');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

function uploadSingle(req, res, next) {
  const handler = upload.single('image');
  handler(req, res, (err) => {
    if (err) return next(err);
    if (!req.file) return res.status(400).json({ success: false, data: null, message: 'No file uploaded' });
    // Construct a public absolute URL to the uploaded file
    const protocol = req.protocol;
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    return res.status(201).json({ success: true, data: { url: fullUrl }, message: 'File uploaded' });
  });
}

function uploadMultiple(req, res, next) {
  const handler = upload.array('images', 12);
  handler(req, res, (err) => {
    if (err) return next(err);
    if (!req.files || !req.files.length) return res.status(400).json({ success: false, data: null, message: 'No files uploaded' });
    const protocol = req.protocol;
    const host = req.get('host');
    const urls = req.files.map((f) => `${protocol}://${host}/uploads/${f.filename}`);
    return res.status(201).json({ success: true, data: { urls }, message: 'Files uploaded' });
  });
}

module.exports = { uploadSingle, uploadMultiple };
