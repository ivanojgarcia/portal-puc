
import express from 'express';
// GrahQL
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

const app = express();
const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: async ({req}) => {
      // Get Token From server
      const token = req.headers['authorization'];  
      if(token !== 'null'){
        try {
  
        } catch (error) {
          console.error(error)
        }
      }
    }
})

server.applyMiddleware({app})

app.listen(4000, () => {
    console.log(`Start server http://localhost:4000${server.graphqlPath}`)
})


