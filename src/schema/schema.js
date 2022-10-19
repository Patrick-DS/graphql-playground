// Third-party imports
import graphql, { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql"
import axios from "axios"

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

const UserIdType = { type: GraphQLInt }

const UserObjectType = new GraphQLObjectType({
	name: "User",
	fields: {
		id: UserIdType,
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
	},
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserObjectType,
			args: { id: UserIdType },
			resolve: async (parentValue, { id }) => {
				const { data } = await axios.get(`http://localhost:3000/users/${id}`)
				return data
			},
		},
	},
})

const RootSchema = new GraphQLSchema({
	query: RootQuery,
})

export default RootSchema
