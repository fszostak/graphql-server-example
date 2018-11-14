const graphql = require("graphql")
const {GraphQLSchema} = graphql

const RootQueryType = require("./types/RootQueryType")
const mutation = require("./Mutations")

module.exports = new GraphQLSchema({
  mutation,
  query: RootQueryType
})
