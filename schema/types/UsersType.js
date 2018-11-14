const graphql = require("graphql")
const axiosCache = require("axios-cache-adapter")

const api = axiosCache.setup({
  cache: {
    maxAge: 1 * 60 * 1000
  }
})

const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = graphql

const UserType = new GraphQLObjectType({
  name: "UsersType",
  fields: () => ({
    id: {type: GraphQLString},
    firstName: {type: GraphQLString},
    age: {type: GraphQLInt},
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4004/companies/${parentValue.companyId}`)
          .then(res => res.data)
          .catch(err => {
            console.error(`UserType: error: ${err.message}`)
          })
      }
    }
  })
})

const CompanyType = new GraphQLObjectType({
  name: "CompanyType",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4004/companies/${parentValue.id}/users`)
          .then(res => res.data)
          .catch(err => {
            console.error(`CompanyType: error: ${err.message}`)
          })
      }
    }
  })
})

module.exports = {UserType, CompanyType}
