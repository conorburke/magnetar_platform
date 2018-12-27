const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLFloat
} = graphql;

const db = require('../../db');
const DepotType = require('./depotType');
const RentedToolType = require('./rentedToolType');

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: GraphQLID },
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone_number: { type: GraphQLString },
		birth_date: { type: GraphQLInt },
		loan_rating: { type: GraphQLFloat },
		borrow_rating: { type: GraphQLFloat },
		depots: {
			type: new GraphQLList(DepotType),
			resolve(parentValue) {
				return db('users')
					.join('depots', 'users.id', '=', 'depots.owner_id')
					.select()
					.where('depots.owner_id', parentValue.id)
					.then(rows => rows);
			}
		},
		rented_tools: {
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
		}
	})
});

module.exports = UserType;
