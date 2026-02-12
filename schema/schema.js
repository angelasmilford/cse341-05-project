const graphql = require('graphql');
const island = require('../models/island');
const tradition = require('../models/tradition');

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} = graphql;

//Schema defines data on the Graph like object types(tradition type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

const TraditionType = new GraphQLObjectType({
    name: 'Tradition',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error IslandType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        islandId: { type: GraphQLID },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        significance: { type: GraphQLString },
        pages: { type: GraphQLInt },
        island: {
        type: IslandType,
        resolve(parent, args) {
            return Island.findById(parent.islandId);
        }
    }
    })
});

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
        tradition:{
            type: new GraphQLList(TraditionType),
            resolve(parent,args){
                return tradition.find({ islandID: parent.id });
            }
        }
    })
})

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all islands, get all traditions, get a particular 
//tradition or get a particular island.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tradition: {
            type: TraditionType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the tradition with id passed in argument 
                //by the user
                return Tradition.findById(args.id);
            }
        },
        traditions:{
            type: new GraphQLList(TraditionType),
            resolve(parent, args) {
                return Tradition.find({});
            }
        },
        island:{
            type: IslandType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Island.findById(args.id);
            }
        },
        islands:{
            type: new GraphQLList(IslandType),
            resolve(parent, args) {
                return Island.find({});
            }
        }
    }
});
 
//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addIsland: {
            type: IslandType,
            args: {
                //GraphQLNonNull make these field required
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
                let island = new Island({
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
        addTradition:{
            type: TraditionType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                islandID: { type: new GraphQLNonNull(GraphQLID)},
                description: { type: new GraphQLNonNull(GraphQLString)},
                category: { type: new GraphQLNonNull(GraphQLString)},
                significance: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let tradition = new Tradition({
                    name:args.name,
                    description:args.description,
                    category:args.category,
                    significance:args.significance,
                    islandID:args.islandID
                })
                return tradition.save()
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});