// Third-party imports
import graphql, { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql"
import _ from "lodash"

// Global imports
import users from "../data/users.json"

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
			resolve: (parentValue, { id }) => _.find(users, { id }),
		},
	},
})

const RootSchema = new GraphQLSchema({
	query: RootQuery,
})

export default RootSchema
