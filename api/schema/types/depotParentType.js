const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const db = require('../../db');
const UserParentType = require('./userParentType');

const DepotParentType = new GraphQLObjectType({
	name: 'DepotParentType',
	fields: () => ({
		id: { type: GraphQLID },
		address_1: { type: GraphQLString },
		address_2: { type: GraphQLString },
		city: { type: GraphQLString },
		region: { type: GraphQLString },
		zipcode: { type: GraphQLInt },
		owner_id: { type: GraphQLID },
		owner: {
			type: UserParentType,
			resolve(parentValue) {
				console.log(parentValue);
				return db('users')
					.join('depots', 'depots.owner_id', '=', 'users.id')
					.select()
					.where('depots.owner_id', parentValue.owner_id)
					.then(rows => rows[0]);
			}
		}
	})
});

module.exports = DepotParentType;
