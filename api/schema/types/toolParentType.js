const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLFloat
} = graphql;

const db = require('../../db');
const ToolPictureType = require('./toolPictureType');

const ToolParentType = new GraphQLObjectType({
	name: 'ToolParentType',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		category: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLFloat },
		depot_id: { type: GraphQLID },
		tool_pictures: {
			type: new GraphQLList(ToolPictureType),
			resolve(parentValue) {
				return db('tools')
					.join('tool_pictures', 'tool_pictures.tool_id', '=', 'tools.id')
					.select()
					.where('tool_pictures.tool_id', parentValue.id)
					.then(rows => rows);
			}
		}
	})
});

module.exports = ToolParentType;
