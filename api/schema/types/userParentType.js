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
const RentedToolType = require('./rentedToolType');

const UserParentType = new GraphQLObjectType({
	name: 'UserParentType',
	fields: () => ({
		id: { type: GraphQLID },
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone_number: { type: GraphQLString },
		birth_date: { type: GraphQLInt },
		loan_rating: { type: GraphQLFloat },
		borrow_rating: { type: GraphQLFloat },
		rented_tools: {
			type: new GraphQLList(RentedToolType),
			resolve(parentValue) {
				return db('tools')
					.join('rented_tools', 'rented_tools.tool_id', '=', 'tools.id')
					.select()
					.where('rented_tools.renter_id', parentValue.id)
					.then(rows => rows);
			}
		}
	})
});

module.exports = UserParentType;
