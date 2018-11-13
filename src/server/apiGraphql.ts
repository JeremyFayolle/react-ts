import { ApolloServer, gql } from 'apollo-server';
import { Db, ObjectId } from 'mongodb';
import express = require('express');
import { promisify } from 'util';
import { readFile } from 'fs';
import { join } from 'path';
import User from '../common/User';

export async function initApi(dbo: Db): Promise<ApolloServer> {

  const readGqlFile = promisify(readFile)(join(__dirname, '../common/schema.gql'));

  const schemaBuffer = await readGqlFile;

  const typeDefs = gql(schemaBuffer.toString());

  const resolvers = {
    User: {
      name: (parent: User): string => `${parent.firstName} ${parent.lastName}`
    },
    Query: {
      getUsers: (parent: {}, {lastName}: { lastName?: string }): Promise<User[]> => {
        const regexp = new RegExp('^[A-Za-z-]{1,16}$');
        const query = {
          ...(lastName && regexp.test(lastName) ? {lastName: { $regex: `.*${lastName}.*`}} : {})
        };
        return dbo.collection('users').find(query).toArray();
      },
    },
    Mutation: {
      createUser: (parent: {}, {user}: {user: User}): Promise<User | null> => dbo.collection('users')
        .insertOne(user)
        .then(res => dbo.collection('users').find<User>({_id: res.insertedId}).next()),
      updateUser: (id: string, userUpdate: User): Promise<User | null> => dbo.collection('users')
        .updateOne({_id: new ObjectId(id)}, { $set: userUpdate})
        .then(res => dbo.collection('users').find<User>({_id: res.upsertedId}).next()),
      deleteUser: (id: string) => dbo.collection('users')
        .deleteMany({_id: new ObjectId(id)}),
    }
  };

  const server = new ApolloServer({typeDefs, resolvers});

  server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
  });

  return server;

}
