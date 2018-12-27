const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ToolPictureType = new GraphQLObjectType({
	name: 'ToolPictureType',
	fields: () => ({
		id: { type: GraphQLID },
		image: { type: GraphQLString },
		tool_id: { type: GraphQLID }
	})
});

module.exports = ToolPictureType;
