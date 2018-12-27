const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLFloat } = graphql;

const db = require('../../db');
const ToolParentType = require('./toolParentType');

const RentedToolType = new GraphQLObjectType({
	name: 'RentedToolType',
	fields: () => ({
		id: { type: GraphQLID },
		start_date: { type: GraphQLFloat },
		end_date: { type: GraphQLFloat },
		tool_id: { type: GraphQLID },
		renter_id: { type: GraphQLID },
		owner_id: { type: GraphQLID },
		tool: {
			type: ToolParentType,
			resolve(parentValue) {
				return db('tools')
					.join('rented_tools', 'rented_tools.tool_id', '=', 'tools.id')
					.select()
					.where('rented_tools.renter_id', parentValue.id)
					.then(rows => rows[0]);
			}
		}
	})
});

module.exports = RentedToolType;
