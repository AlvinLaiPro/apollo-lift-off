const {gql} = require('apollo-server');

const typeDefs = gql`
    "A track is a group of Modules that teaches about a specific topic"
    type Track {
        id: ID!
        title: String!
        author: Author!
        thumbnail: String
        length: Int @deprecated(reason: "Use durationInSeconds")
        durationInSeconds: Int
        modulesCount: Int
        numberOfViews: Int
        description: String
        modules: [Module!]!
    }

    "Author of a compete track"
    type Author {
        id: ID!
        name: String!
        photo: String
    }

    type Module {
        id: ID!
        title: String!
        length: Int @deprecated(reason: "Use durationInSeconds")
        durationInSeconds: Int
        videoUrl: String!
        content: String
    }

    type Query {
        "Get tracks array for homepage grid"
        tracksForHome: [Track!]!
        track(id: ID!): Track
        module: Module
    }

    type Mutation {
        incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
    }

    type IncrementTrackViewsResponse {
        code: Int!
        success: Boolean!
        message: String!
        track: Track
    }
`;

module.exports = typeDefs;
