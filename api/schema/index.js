const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const mutations = require('./mutations');
const RootQueryType = require('./rootQueryType');

module.exports = new GraphQLSchema({
	mutation: mutations,
	query: RootQueryType
});
