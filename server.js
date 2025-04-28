const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Make 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads folder if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

let users = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', upload.single('profilePic'), (req, res) => {
  const { name, email } = req.body;
  const profilePic = req.file ? `/uploads/${req.file.filename}` : null;
  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const newUser = { name, email, profilePic };
  users.push(newUser);
  res.json(newUser);
});

app.listen(5000, () => {
  console.log("🚀 Backend server running on http://localhost:5000");
});
