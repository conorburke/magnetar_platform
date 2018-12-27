const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLFloat
} = graphql;

const db = require('../../db');
const DepotParentType = require('./depotParentType');
const RentedToolType = require('./rentedToolType');
const ToolPictureType = require('./toolPictureType');

const ToolType = new GraphQLObjectType({
	name: 'ToolType',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		category: { type: GraphQLString },
		description: { type: GraphQLString },
		price: { type: GraphQLFloat },
		depot_id: { type: GraphQLID },
		depot: {
			type: DepotParentType,
			resolve(parentValue) {
				return db('depots')
					.join('tools', 'tools.depot_id', '=', 'depots.id')
					.select()
					.where('tools.depot_id', parentValue.depot_id)
					.then(rows => rows[0]);
			}
		},
		reserved_tools: {
			type: new GraphQLList(RentedToolType),
			resolve(parentValue) {
				return db('tools')
					.join('rented_tools', 'rented_tools.tool_id', '=', 'tools.id')
					.select()
					.where('rented_tools.renter_id', parentValue.id)
					.then(rows => rows);
			}
		},
		loaned_tools: {
			type: new GraphQLList(RentedToolType),
			resolve(parentValue) {
				return db('tools')
					.join('rented_tools', 'rented_tools.tool_id', '=', 'tools.id')
					.select()
					.where('rented_tools.owner_id', parentValue.id)
					.then(rows => rows);
			}
		},
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

module.exports = ToolType;
