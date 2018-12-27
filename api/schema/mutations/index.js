const graphql = require('graphql');
const {
	GraphQLFloat,
	GraphQLID,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = graphql;

const db = require('../../db');
const DepotType = require('../types/depotType');
const RentedToolType = require('../types/rentedToolType');
const ToolPictureType = require('../types/toolPictureType');
const ToolType = require('../types/toolType');
const UserType = require('../types/userType');

const mutations = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDepot: {
			type: DepotType,
			args: {
				address_1: { type: GraphQLString },
				address_2: { type: GraphQLString },
				city: { type: GraphQLString },
				region: { type: GraphQLString },
				zipcode: { type: GraphQLInt },
				owner_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ address_1, address_2, city, region, zipcode, owner_id }
			) {
				return db('depots').insert({
					address_1,
					address_2,
					city,
					region,
					zipcode,
					owner_id
				});
			}
		},
		addRentedTool: {
			type: RentedToolType,
			args: {
				start_date: { type: GraphQLFloat },
				end_date: { type: GraphQLFloat },
				tool_id: { type: GraphQLID },
				renter_id: { type: GraphQLID },
				owner_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ start_date, end_date, tool_id, renter_id, owner_id }
			) {
				return db('rented_tools').insert({
					start_date,
					end_date,
					tool_id,
					renter_id,
					owner_id
				});
			}
		},
		addTool: {
			type: ToolType,
			args: {
				title: { type: GraphQLString },
				category: { type: GraphQLString },
				description: { type: GraphQLString },
				price: { type: GraphQLFloat },
				depot_id: { type: GraphQLID }
			},
			resolve(parentValue, { title, category, description, price, depot_id }) {
				return db('tools').insert({
					title,
					category,
					description,
					price,
					depot_id
				});
			}
		},
		addToolPicture: {
			type: ToolPictureType,
			args: {
				image: { type: GraphQLString },
				tool_id: { type: GraphQLID }
			},
			resolve(parentValue, { image, tool_id }) {
				return db('tool_pictures').insert({
					image,
					tool_id
				});
			}
		},
		updateUser: {
			type: UserType,
			args: {
				first_name: { type: GraphQLString },
				last_name: { type: GraphQLString },
				email: { type: GraphQLString },
				phone_number: { type: GraphQLString }
			},
			resolve(parentValue, { first_name, last_name, email, phone_number }) {
				return db('users')
					.where({ email })
					.update({
						first_name,
						last_name,
						email,
						phone_number
					});
			}
		},
		deleteDepot: {
			type: DepotType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, { id }) {
				return db('depots')
					.where({ id })
					.del();
			}
		},
		deleteRentedTool: {
			type: RentedToolType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, { id }) {
				return db('rented_tools')
					.where({ id })
					.del();
			}
		},
		deleteTool: {
			type: ToolType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, { id }) {
				return db('tools')
					.where({ id })
					.del();
			}
		},
		deleteToolPicture: {
			type: ToolPictureType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, { id }) {
				return db('tool_pictures')
					.where({ id })
					.del();
			}
		},
		updateDepot: {
			type: DepotType,
			args: {
				id: { type: GraphQLID },
				address_1: { type: GraphQLString },
				address_2: { type: GraphQLString },
				city: { type: GraphQLString },
				region: { type: GraphQLString },
				zipcode: { type: GraphQLInt },
				owner_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ id, address_1, address_2, city, region, zipcode, owner_id }
			) {
				return db('depots')
					.where({ id })
					.update({
						address_1,
						address_2,
						city,
						region,
						zipcode,
						owner_id
					});
			}
		},
		updateRentedTool: {
			type: RentedToolType,
			args: {
				id: { type: GraphQLID },
				start_date: { type: GraphQLFloat },
				end_date: { type: GraphQLFloat },
				tool_id: { type: GraphQLID },
				renter_id: { type: GraphQLID },
				owner_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ id, start_date, end_date, tool_id, renter_id, owner_id }
			) {
				return db('rented_tools')
					.where({ id })
					.update({
						start_date,
						end_date,
						tool_id,
						renter_id,
						owner_id
					});
			}
		},
		updateTool: {
			type: ToolType,
			args: {
				id: { type: GraphQLID },
				title: { type: GraphQLString },
				category: { type: GraphQLString },
				description: { type: GraphQLString },
				price: { type: GraphQLFloat },
				depot_id: { type: GraphQLID }
			},
			resolve(
				parentValue,
				{ id, title, category, description, price, depot_id }
			) {
				return db('tools')
					.where({ id })
					.update({
						title,
						category,
						description,
						price,
						depot_id
					});
			}
		},
		updateToolPicture: {
			type: ToolPictureType,
			args: {
				id: { type: GraphQLID },
				image: { type: GraphQLString },
				tool_id: { type: GraphQLID }
			},
			resolve(parentValue, { id, image, tool_id }) {
				return db('tool_pictures')
					.where({ id })
					.update({
						image,
						tool_id
					});
			}
		}
	}
});

module.exports = mutations;
