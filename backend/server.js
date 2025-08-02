// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// prosta trasa GET /api/albums zwracająca pustą listę
app.get('/api/albums', (req, res) => {
  res.json([]);  
});

// uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer Express działa na porcie ${PORT}`);
});
