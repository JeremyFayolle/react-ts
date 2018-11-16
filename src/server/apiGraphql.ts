import { ApolloServer, gql } from 'apollo-server-express';
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
      createUser: (parent: {}, {user}: {user: User}): Promise<User | null> => (
        dbo.collection('users').insertOne(user).then(res => (
          dbo.collection('users').findOne<User>({_id: res.insertedId}))
        )
      ),
      updateUser: (parent: {}, {id, userUpdate}: { id: string, userUpdate: User }): Promise<User | null> => (
        dbo.collection('users').updateOne({_id: new ObjectId(id)}, { $set: userUpdate}).then(res => (
          dbo.collection('users').findOne<User>({_id: res.upsertedId}))
        )
      ),
      deleteUser: (parent: {}, {id}: { id: string }) => (
        dbo.collection('users').deleteOne({_id: new ObjectId(id)}).then(({deletedCount}) => deletedCount! > 0)
      ),
    }
  };

  return new ApolloServer({typeDefs, resolvers});
}
