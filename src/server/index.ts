import { join } from 'path';
import express = require('express');
import { initApi } from './api';
import { MongoClient } from 'mongodb';
import { readFile } from 'fs';
import { compile } from 'ejs'
import { promisify } from 'util';

const devRegExp = /^DEV(ELOPMENT)?$/i;
const prodRegExp = /^PROD(UCTION)?$/i;

const SERVER_PORT = process.env['SERVER_PORT'] || '3000';
// TODO - remove trailing slash from url
const MONGO_URL = process.env['MONGO_URL'] || 'mongodb://localhost:27017/';
const MODE = prodRegExp.test(process.env['NODE_ENV']!) ? 'PRODUCTION' : devRegExp.test(process.env['NODE_ENV']!) ? 'DEVELOPMENT' : null;
if (!MODE) {
  console.error(new Error('Invalid mode'));
  process.exit(1);
}


export async function buildServer(mongoUrl = MONGO_URL): Promise<express.Application> {
  const readEjsFile = promisify(readFile)(join(__dirname, '../../dist/client/index.ejs'));

  // TODO - Extract the name of the in a global variable
  // TODO - Convert double quotes
  const dbo = (await MongoClient.connect(mongoUrl)).db("node-server");
  const htmlBuffer = await readEjsFile;
  const compiled = compile(htmlBuffer.toString());

  const html = compiled({mode: MODE});

  const app: express.Application = express();

  app.get('/react.js', (req, res) => {
    // TODO - Store the buffer content for performances
    // TODO - Return different bundles observing mode
    res.sendFile(join(__dirname, '../../node_modules/react/umd/react.development.js'));
  });

  app.get('/react-dom.js', (req, res) => {
    // TODO - idem
    // TODO - idem
    res.sendFile(join(__dirname, '../../node_modules/react-dom/umd/react-dom.development.js'));
  });

  app.get('/bundle.js', (req, res) => {
    // TODO - idem
    res.sendFile(join(__dirname, '../../dist/client/bundle.js'));
  });

  app.use('/api', initApi(dbo));

  app.use((req, res, next) => {
    if (req.path.includes('.')) return next();
    res.setHeader('Content-type', 'text/html; charset=utf-8')
    res.send(html);
  });

  return app;
}

if (process.mainModule && process.mainModule.filename === __filename) {
  buildServer(MONGO_URL).then((serverApp: express.Application) => serverApp.listen(SERVER_PORT, () => console.log('Listen on ' + SERVER_PORT)))
}
