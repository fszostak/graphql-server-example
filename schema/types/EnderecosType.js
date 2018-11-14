const graphql = require("graphql")
const axiosCache = require("axios-cache-adapter")

// 60 minutos de cache
const api = axiosCache.setup({
  cache: {
    maxAge: 60 * 60 * 1000
  }
})

const {GraphQLObjectType, GraphQLString} = graphql

// enderecos - relacionamentos
const EstadoType = new GraphQLObjectType({
  name: "Estado",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    code: {type: GraphQLString}
  })
})

const CidadeType = new GraphQLObjectType({
  name: "Cidade",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    estado: {
      type: EstadoType,
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/estado/${parentValue.estadoId}`)
          .then(res => res.data)
          .catch(err => {
            console.error(`CidadeType: error: ${err.message}`)
          })
      }
    }
  })
})

const BairroType = new GraphQLObjectType({
  name: "Bairro",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    cidade: {
      type: CidadeType,
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/cidade/${parentValue.cidadeId}`)
          .then(res => res.data)
          .catch(err => {
            console.error(`BairroType: error: ${err.message}`)
          })
      }
    }
  })
})

const LogradouroType = new GraphQLObjectType({
  name: "Logradouro",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    bairro: {
      type: BairroType,
      resolve(parentValue, args) {
        return api
          .get(`http://localhost:4001/api/bairro/${parentValue.bairroId}`)
          .then(res => res.data)
          .catch(err => {
            console.error(`LogradouroType: error: ${err.message}`)
          })
      }
    }
  })
})

module.exports = {EstadoType, CidadeType, BairroType, LogradouroType}
