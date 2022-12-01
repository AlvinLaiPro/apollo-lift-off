const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

async function startApolloServer() {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                trackAPI: new TrackAPI(),
            }
        }
    });
    const {url} = await server.listen({
        port: process.env.PORT || 4000
    });

    console.log(`🚀  Server ready at ${url}`);
}

startApolloServer();
