// Third-party imports
import graphql, { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from "graphql"
import axios from "axios"

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

const IdType = { type: GraphQLInt }

const CompanyObjectType = new GraphQLObjectType({
	name: "Company",
	fields: () => ({
		id: IdType,
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		users: {
			type: new GraphQLList(UserObjectType),
			resolve: async ({ id }) => {
				const { data } = await axios.get(`http://localhost:3000/companies/${id}/users`)
				return data
			},
		},
	}),
})

const UserObjectType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: IdType,
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyObjectType,
			resolve: async ({ id }) => {
				const { data } = await axios.get(`http://localhost:3000/companies/${id}`)
				return data
			},
		},
	}),
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserObjectType,
			args: { id: IdType },
			resolve: async (parentValue, { id }) => {
				const { data } = await axios.get(`http://localhost:3000/users/${id}`)
				return data
			},
		},
		company: {
			type: CompanyObjectType,
			args: { id: IdType },
			resolve: async (parentValue, { id }) => {
				const { data } = await axios.get(`http://localhost:3000/companies/${id}`)
				return data
			},
		},
	},
})

const RootSchema = new GraphQLSchema({
	query: RootQuery,
})

export default RootSchema
