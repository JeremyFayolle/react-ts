// TODO - idem
// TODO - idem
import express = require('express');

import { User } from '../common/User';
import { Db, ObjectId } from 'mongodb';
import bodyParser = require('body-parser');


export function initApi(dbo: Db): express.Router {
  const router = express.Router();
  router.use(bodyParser.json())
  router.get('/users', (req, res) => {
    const regexp = new RegExp('^[A-Za-z-]{1,16}$');
    const query = {
      // TODO - Remove trailing space
      ...(req.query['lastName'] && regexp.test(req.query['lastName']) ? {lastName: { $regex: `.*${req.query['lastName']}.*`}} : {})
    }
    // TODO - Dont throw error in handler or the request will never be ended.
    dbo.collection('users').find(query).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  router.post('/users', (req, res) => {
    dbo.collection('users').insertOne(req.body, function(err, resu) {
      // TODO - idem
      if (err) throw err;
      dbo.collection('users').find({}).toArray(function(err, result) {
        // TODO - idem
        if (err) throw err;
        res.send(result);
      });
    });
  });

  router.delete('/users/:id', (req, res) => {
    // TODO - Dont declare useless arguments
    dbo.collection('users').deleteMany({_id: new ObjectId(req.params.id)}, function(err, resu) {
      // TODO - idem
      if (err) throw err;
      dbo.collection('users').find({}).toArray(function(err, result) {
        // TODO - idem
        if (err) throw err;
        res.send(result);
      });
    });
  });

  router.put('/users/:id', (req, res) => {
    delete req.body._id;
    // TODO - idem
    // TODO - idem
    dbo.collection('users').updateOne({_id: new ObjectId(req.params.id)}, { $set: req.body}, function(err, resu) {
      // TODO - idem
      if (err) throw err;
      dbo.collection('users').find({}).toArray(function(err, result) {
        // TODO - idem
        if (err) throw err;
        res.send(result);
      });
    });
  });

  return router;
}
