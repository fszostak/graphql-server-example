const graphql = require("graphql")
const axios = require("axios")
const {UserType} = require("./types/UsersType")

const {GraphQLString, GraphQLObjectType, GraphQLNonNull, GraphQLInt} = graphql

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        companyId: {type: GraphQLString}
      },
      resolve(parentValue, {firstName, age, companyId}) {
        return axios
          .post("http://localhost:4004/users", {firstName, age, companyId})
          .then(res => res.data)
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {id}) {
        return axios
          .delete(`http://localhost:4004/users/${id}`)
          .then(res => res.data)
      }
    }
  }
})

module.exports = Mutations
