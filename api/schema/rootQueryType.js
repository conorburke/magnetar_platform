const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const db = require('../db');
const DepotType = require('./types/depotType');
const RentedToolType = require('./types/rentedToolType');
const ToolType = require('./types/toolType');
const ToolPictureType = require('./types/toolPictureType');
const UserType = require('./types/userType');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		depots: {
			type: new GraphQLList(DepotType),
			resolve() {
				return db.select().from('depots');
			}
		},
		depot: {
			type: DepotType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('depots')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		},
		rentedTools: {
			type: new GraphQLList(RentedToolType),
			resolve() {
				return db.select().from('rented_tools');
			}
		},
		rentedTool: {
			type: RentedToolType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('rented_tools')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		},
		tools: {
			type: new GraphQLList(ToolType),
			resolve() {
				return db.select().from('tools');
			}
		},
		tool: {
			type: ToolType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('tools')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		},
		toolPictures: {
			type: new GraphQLList(ToolPictureType),
			resolve() {
				return db.select().from('tool_pictures');
			}
		},
		toolPicture: {
			type: ToolPictureType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('tool_pictures')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		},
		users: {
			type: new GraphQLList(UserType),
			resolve() {
				return db.select().from('users');
			}
		},
		user: {
			type: UserType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return db
					.select()
					.from('users')
					.where({ id: parseInt(id) })
					.then(res => res[0]);
			}
		}
	})
});

module.exports = RootQuery;
