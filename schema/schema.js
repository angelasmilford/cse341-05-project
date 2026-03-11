const graphql = require('graphql');
const Island = require('../models/island');
const Tradition = require('../models/tradition');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

/* ======================
   Tradition Type
====================== */

const TraditionType = new GraphQLObjectType({
  name: 'Tradition',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    islandId: { type: GraphQLID },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    significance: { type: GraphQLString },

    island: {
      type: IslandType,
      resolve(parent) {
        return Island.findById(parent.islandId);
      }
    }
  })
});

/* ======================
   Island Type
====================== */

const IslandType = new GraphQLObjectType({
  name: 'Island',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    population: { type: GraphQLInt },
    language: { type: GraphQLString },
    capital: { type: GraphQLString },
    subRegion: { type: GraphQLString },
    climate: { type: GraphQLString },
    mainIndustries: { type: new GraphQLList(GraphQLString) },
    elevation: { type: GraphQLInt },

    traditions: {
      type: new GraphQLList(TraditionType),
      resolve(parent) {
        return Tradition.find({ islandId: parent.id });
      }
    }
  })
});

/* ======================
   Root Query
====================== */

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    tradition: {
      type: TraditionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Tradition.findById(args.id);
      }
    },

    traditions: {
      type: new GraphQLList(TraditionType),
      resolve() {
        return Tradition.find({});
      }
    },

    island: {
      type: IslandType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Island.findById(args.id);
      }
    },

    islands: {
      type: new GraphQLList(IslandType),
      resolve() {
        return Island.find({});
      }
    }

  }
});

/* ======================
   Mutations
====================== */

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    addIsland: {
      type: IslandType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        population: { type: new GraphQLNonNull(GraphQLInt) },
        language: { type: new GraphQLNonNull(GraphQLString) },
        capital: { type: new GraphQLNonNull(GraphQLString) },
        subRegion: { type: new GraphQLNonNull(GraphQLString) },
        climate: { type: new GraphQLNonNull(GraphQLString) },
        mainIndustries: { type: new GraphQLList(GraphQLString) },
        elevation: { type: new GraphQLNonNull(GraphQLInt) }
      },

      resolve(parent, args) {

        const island = new Island({
          name: args.name,
          country: args.country,
          population: args.population,
          language: args.language,
          capital: args.capital,
          subRegion: args.subRegion,
          climate: args.climate,
          mainIndustries: args.mainIndustries,
          elevation: args.elevation
        });

        return island.save();
      }
    },

    addTradition: {
      type: TraditionType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        islandId: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        significance: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args) {

        const tradition = new Tradition({
          name: args.name,
          islandId: args.islandId,
          description: args.description,
          category: args.category,
          significance: args.significance
        });

        return tradition.save();
      }
    }

  }
});

/* ======================
   Export Schema
====================== */

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});