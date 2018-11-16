import { compile } from 'ejs'
import express = require('express');
import { readFile } from 'fs';
import { MongoClient } from 'mongodb';
import { join } from 'path';
import { promisify } from 'util';

import { initApi } from './apiGraphql';


const devRegExp = /^DEV(ELOPMENT)?$/i;
const prodRegExp = /^PROD(UCTION)?$/i;

const SERVER_PORT = process.env['SERVER_PORT'] || '3000';
const MONGO_URL = process.env['MONGO_URL'] || 'mongodb://localhost:27017';
const MODE = prodRegExp.test(process.env['NODE_ENV']!) ? 'PRODUCTION' : devRegExp.test(process.env['NODE_ENV']!) ? 'DEVELOPMENT' : null;
if (!MODE) {
  console.error(new Error('Invalid mode'));
  process.exit(1);
}
const DATABASE_NAME = 'node-server';


export async function buildServer(mongoUrl = MONGO_URL): Promise<express.Application> {
  const readEjsFile = promisify(readFile)(join(__dirname, '../../dist/client/index.ejs'));

  const dbo = (await MongoClient.connect(mongoUrl)).db(DATABASE_NAME);
  const htmlBuffer = await readEjsFile;
  const compiled = compile(htmlBuffer.toString());

  const html = compiled({mode: MODE});

  const app: express.Application = express();

  const reactFile = await promisify(readFile)(join(__dirname, `../../node_modules/react/umd/react.${MODE === 'PRODUCTION' ? 'production.min' : 'development'}.js`));
  const reactDomFile = await promisify(readFile)(join(__dirname, `../../node_modules/react-dom/umd/react-dom.${MODE === 'PRODUCTION' ? 'production.min' : 'development'}.js`));
  const bundleFile = await promisify(readFile)(join(__dirname, '../../dist/client/index.js'));
  const stylesFile = await promisify(readFile)(join(__dirname, '../../dist/client/styles.css'));

  app.get('/react.js', (req, res) => {
    res.setHeader('Content-type', 'application/javascript')
    res.write(reactFile);
    res.end();
  });

  app.get('/react-dom.js', (req, res) => {
    res.setHeader('Content-type', 'application/javascript')
    res.write(reactDomFile);
    res.end();
  });

  app.get('/bundle.js', (req, res) => {
    res.setHeader('Content-type', 'application/javascript')
    res.write(bundleFile);
    res.end();
  });

  app.get('/main.css', (req, res) => {
    res.setHeader('Content-type', 'text/css')
    res.write(stylesFile);
    res.end();
  });

  (await initApi(dbo)).applyMiddleware({app});

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
