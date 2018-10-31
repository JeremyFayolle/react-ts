import { createServer } from 'http';
import { join } from 'path';
import express = require('express');
import { initApi } from './api';
import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("node-server");
  if (err) throw err;

  const app = express();

  app.get('/react.js', (req, res) => {
    res.sendFile(join(__dirname, '../../node_modules/react/umd/react.development.js'));
  });

  app.get('/react-dom.js', (req, res) => {
    res.sendFile(join(__dirname, '../../node_modules/react-dom/umd/react-dom.development.js'));
  });

  app.get('/bundle.js', (req, res) => {
    res.sendFile(join(__dirname, '../../dist/client/bundle.js'));
  });

  app.use('/api', initApi(dbo));

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../../src/client/index.html'));
  });

  const server = createServer(app);

  const port = 3000;

  server.listen(port, () => console.log("LISTEN SERVER " + port));

  console.log("Database opened!");
});
