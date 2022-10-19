// Third-party imports
import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } from "graphql"
import axios from "axios"

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

const IdType = { type: GraphQLInt }
const AgeType = { type: GraphQLInt }
const FirstNameType = { type: GraphQLString }
const CompanyNameType = { type: GraphQLString }
const CompanyDescriptionType = { type: GraphQLString }

const nonNullType = graphQLType => ({ type: new GraphQLNonNull(graphQLType.type) })

const CompanyObjectType = new GraphQLObjectType({
	name: "Company",
	fields: () => ({
		id: IdType,
		name: CompanyNameType,
		description: CompanyDescriptionType,
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
		firstName: FirstNameType,
		age: AgeType,
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
	name: "RootQuery",
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

const RootMutation = new GraphQLObjectType({
	name: "RootMutation",
	fields: {
		addUser: {
			type: UserObjectType,
			args: {
				firstName: nonNullType(FirstNameType),
				age: nonNullType(AgeType),
				companyId: IdType,
			},
			resolve: async (parentValue, { firstName, age, companyId }) => {
				const { data } = await axios.post(`http://localhost:3000/users`, {
					firstName,
					age,
					...(companyId ? { companyId } : {}),
				})
				return data
			},
		},
	},
})

const RootSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
})

export default RootSchema
