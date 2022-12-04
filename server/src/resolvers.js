const resolvers = {
    Query: {
        tracksForHome: (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracksForHome();
        },
        track: (_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getTrack(id);
        },
        module: (_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getModules(id);
        }
    },

    Mutation: {
        incrementTrackViews: async (_, {id}, {dataSources}) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id);
                return {
                    code: 200,
                    success: true,
                    message: `Successfully return for ${id}`,
                    track,
                }
            } catch (error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    track: null,
                }
            }
        }
    },

    Track: {
        author: ({authorId}, _, {dataSources}) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },
        modules: ({id}, _, {dataSources}) => {
            return dataSources.trackAPI.getTrackModules(id);
        },
        durationInSeconds: ({length}) => length,
    },
    Module: {
        durationInSeconds: ({length}) => length,
    }
};

module.exports = resolvers;
