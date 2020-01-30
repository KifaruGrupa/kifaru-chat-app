const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const port = process.env.PORT || 7000;
const app = express();
dotenv.config();

app.use(express.static(path.resolve(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../public/assets/images')));

app.listen(port, () => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
});