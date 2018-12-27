const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt
} = graphql;

const db = require('../../db');
const ToolType = require('./toolType');
const UserParentType = require('./userParentType');

const DepotType = new GraphQLObjectType({
	name: 'DepotType',
	fields: () => ({
		id: { type: GraphQLID },
		address_1: { type: GraphQLString },
		address_2: { type: GraphQLString },
		city: { type: GraphQLString },
		region: { type: GraphQLString },
		zipcode: { type: GraphQLInt },
		owner_id: { type: GraphQLID },
		tools: {
			type: new GraphQLList(ToolType),
			resolve(parentValue) {
				return db('depots')
					.join('tools', 'depots.id', '=', 'tools.depot_id')
					.select()
					.where('tools.depot_id', parentValue.id)
					.then(rows => rows);
			}
		},
		owner: {
			type: UserParentType,
			resolve(parentValue) {
				return db('users')
					.join('depots', 'depots.owner_id', '=', 'users.id')
					.select()
					.where('depots.owner_id', parentValue.owner_id)
					.then(rows => rows[0]);
			}
		}
	})
});

module.exports = DepotType;
