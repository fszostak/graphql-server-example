const graphql = require("graphql")

const {UserType, CompanyType} = require("./UsersType")
const {
  EstadoType,
  CidadeType,
  BairroType,
  LogradouroType
} = require("./EnderecosType")


const axios = require("axios")
const axiosCache = require("axios-cache-adapter")

const api = axiosCache.setup({
  cache: {
    maxAge: 5 * 60 * 1000
  }
})

const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = graphql

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    
    // --- users - root Queries

    user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:4004/users/${args.id}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/user: error: ${err.message}`)
          })
      }
    },
    company: {
      type: CompanyType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:4004/companies/${args.id}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/company: error: ${err.message}`)
          })
      }
    },

    // --- enderecos - root Queries
    estado: {
      type: EstadoType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/estado/${args.id}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/estado: error: ${err.message}`)
          })
      }
    },

    cidade: {
      type: CidadeType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/cidade/${args.id}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/cidade: error: ${err.message}`)
          })
      }
    },

    bairro: {
      type: BairroType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/bairro/${args.id}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/bairro: error: ${err.message}`)
          })
      }
    },

    logradouro: {
      type: LogradouroType,
      args: {id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/logradouro/${args.id}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/logradouro: error: ${err.message}`)
          })
      }
    },

    estados: {
      type: new GraphQLList(EstadoType),
      args: {filter: {type: GraphQLString}},
      resolve(parentValue, args) {
        return (
          api
            .get(`http://localhost:4001/api/estados/${encodeURI(args.filter)}`)
            // .then(resp => !Array.isArray(resp.data) ? new Array(resp.data) : resp.data)
            .then(resp => resp.data)
            .catch(err => {
              console.error(`RootQuery/estados: error: ${err.message}`)
            })
        )
      }
    },

    cidades: {
      type: new GraphQLList(CidadeType),
      args: {filter: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/cidades/${encodeURI(args.filter)}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/cidades: error: ${err.message}`)
          })
      }
    },

    bairros: {
      type: new GraphQLList(BairroType),
      args: {filter: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/bairros/${encodeURI(args.filter)}`)
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/bairros: error: ${err.message}`)
          })
      }
    },

    logradouros: {
      type: new GraphQLList(LogradouroType),
      args: {filter: {type: GraphQLString}},
      resolve(parentValue, args) {
        return api
          .get(
            `http://localhost:4001/api/logradouros/${encodeURI(args.filter)}`
          )
          .then(resp => resp.data)
          .catch(err => {
            console.error(`RootQuery/logradouros: error: ${err.message}`)
          })
      }
    }
  }
})

module.exports = RootQueryType
