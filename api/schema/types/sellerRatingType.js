const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const db = require('../../db');
const UserParentType = require('./userParentType');

const SellerRatingType = new GraphQLObjectType({
	name: 'SellerRatingType',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		rating: { type: GraphQLString },
		owner_id: { type: GraphQLID },
		owner: {
			type: UserParentType,
			resolve(parentValue) {
				return db('users')
					.join('seller_ratings', 'seller_ratings.owner_id', '=', 'users.id')
					.select()
					.where('seller_ratings.owner_id', parentValue.owner_id)
					.then(rows => rows[0]);
			}
		}
	})
});

module.exports = SellerRatingType;
