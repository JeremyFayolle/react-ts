import bodyParser = require('body-parser');
import express = require('express');
import { Db, ObjectId } from 'mongodb';

import { User } from '../common/User';

export function initApi(dbo: Db): express.Router {
  const router = express.Router();
  router.use(bodyParser.json())
  router.get('/users', (req, res) => {
    const regexp = new RegExp('^[A-Za-z-]{1,16}$');
    const query = {
      ...(req.query['lastName'] && regexp.test(req.query['lastName']) ? {lastName: {$regex: `.*${req.query['lastName']}.*`}} : {})
    }
    // TODO - Use the Promise signature instead of callback;
    dbo.collection('users').find(query).toArray((err, result) => res.send(result));
  });

  router.post('/users', (req, res) => {
    dbo.collection('users').insertOne(req.body, () => {
      // TODO - idem
      dbo.collection('users').find({}).toArray((err, result) => res.send(result));
    });
  });

  router.delete('/users/:id', (req, res) => {
    dbo.collection('users').deleteMany({_id: new ObjectId(req.params.id)}, () => {
      // TODO - idem
      dbo.collection('users').find({}).toArray((err, result) => res.send(result));
    });
  });

  router.put('/users/:id', (req, res) => {
    delete req.body._id;
    dbo.collection('users').updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body}, (err, resu) => {
      // TODO - idem
      dbo.collection('users').find({}).toArray((err, result) => res.send(result));
    });
  });

  router.use(((err, req, res) => {
    console.error(err);
    if (!res.headersSent) res.status(500).end();
  }) as express.ErrorRequestHandler)

  return router;
}
