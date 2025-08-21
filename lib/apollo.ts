import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://graphql-api-brown.vercel.app/api/graphql", // Replace with your GraphQL API
    cache: new InMemoryCache(),
});

export default apolloClient;