const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const db = require('../../db');
const UserParentType = require('./userParentType');

const ClientRatingType = new GraphQLObjectType({
	name: 'ClientRatingType',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		rating: { type: GraphQLString },
		owner_id: { type: GraphQLID },
		owner: {
			type: UserParentType,
			resolve(parentValue) {
				return db('users')
					.join('client_ratings', 'client_ratings.owner_id', '=', 'users.id')
					.select()
					.where('client_ratings.owner_id', parentValue.owner_id)
					.then(rows => rows[0]);
			}
		}
	})
});

module.exports = ClientRatingType;
