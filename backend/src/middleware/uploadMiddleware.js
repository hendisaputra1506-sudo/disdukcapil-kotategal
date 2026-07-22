const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Memastikan folder uploads/news tersedia
const uploadDir = path.join(__dirname, '../../uploads/news');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Disk Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate nama file acak & aman untuk mencegah overwriting dan security bypass
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `news-${uniqueSuffix}${ext}`);
  }
});

// Validasi Tipe File (MIME Type)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Tipe file tidak didukung. Hanya gambar (JPG, JPEG, PNG, WebP) yang diperbolehkan.');
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

// Inisialisasi Multer Uploader (Limit Maksimal 5MB)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

// Middleware wrapper untuk penanganan error Multer yang bersih
const uploadSingleThumbnail = (req, res, next) => {
  const singleUpload = upload.single('thumbnail');

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Ukuran file thumbnail terlalu besar. Maksimal 5MB.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Gagal mengunggah file: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Gagal mengunggah file thumbnail'
      });
    }
    next();
  });
};

// Memastikan folder uploads/banners tersedia
const bannerUploadDir = path.join(__dirname, '../../uploads/banners');
if (!fs.existsSync(bannerUploadDir)) {
  fs.mkdirSync(bannerUploadDir, { recursive: true });
}

// Storage khusus Banner
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, bannerUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `banner-${uniqueSuffix}${ext}`);
  }
});

const uploadBanner = multer({
  storage: bannerStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

const uploadSingleBanner = (req, res, next) => {
  const singleUpload = uploadBanner.single('image');

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Ukuran file gambar banner terlalu besar. Maksimal 5MB.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Gagal mengunggah gambar banner: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Gagal mengunggah gambar banner'
      });
    }
    next();
  });
};

// Memastikan folder uploads/gallery tersedia
const galleryUploadDir = path.join(__dirname, '../../uploads/gallery');
if (!fs.existsSync(galleryUploadDir)) {
  fs.mkdirSync(galleryUploadDir, { recursive: true });
}

// Storage khusus Gallery
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, galleryUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `gallery-${uniqueSuffix}${ext}`);
  }
});

const uploadGallery = multer({
  storage: galleryStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

const uploadSingleGallery = (req, res, next) => {
  const singleUpload = uploadGallery.single('image');

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Ukuran file gambar galeri terlalu besar. Maksimal 5MB.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Gagal mengunggah gambar galeri: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Gagal mengunggah gambar galeri'
      });
    }
    next();
  });
};

// Memastikan folder uploads/documents tersedia
const documentUploadDir = path.join(__dirname, '../../uploads/documents');
if (!fs.existsSync(documentUploadDir)) {
  fs.mkdirSync(documentUploadDir, { recursive: true });
}

// Storage khusus Document
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `document-${uniqueSuffix}${ext}`);
  }
});

// Validasi Tipe File Dokumen (Whitelisting MIME Type & Ext)
const documentFileFilter = (req, file, cb) => {
  const allowedExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.rtf'];
  const forbiddenExts = ['.exe', '.js', '.php', '.sh', '.bat', '.cmd', '.html', '.htm', '.svg', '.zip', '.rar'];

  const ext = path.extname(file.originalname).toLowerCase();

  // Rejection instan jika ekstensi dilarang / executable
  if (forbiddenExts.includes(ext)) {
    const error = new Error('Tipe file dokumen tidak diizinkan. File executable dan script dilarang demi keamanan.');
    error.code = 'INVALID_DOCUMENT_TYPE';
    return cb(error, false);
  }

  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/rtf'
  ];

  if (allowedMimeTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    const error = new Error('Tipe file tidak didukung. Hanya dokumen PDF, DOC, DOCX, XLS, XLSX, TXT, RTF yang diperbolehkan.');
    error.code = 'INVALID_DOCUMENT_TYPE';
    cb(error, false);
  }
};

const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

const uploadSingleDocument = (req, res, next) => {
  // Support field 'file' atau 'document'
  const singleUpload = uploadDocument.single('file');

  singleUpload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Ukuran file dokumen terlalu besar. Maksimal 10MB.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Gagal mengunggah file dokumen: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Gagal mengunggah file dokumen'
      });
    }
    next();
  });
};

module.exports = {
  uploadSingleThumbnail,
  uploadSingleBanner,
  uploadSingleGallery,
  uploadSingleDocument
};
