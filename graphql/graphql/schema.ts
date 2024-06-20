import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Post {
        id: String!
        title: String!
        date: String!
        content: String!
    }

    type Query {
        posts: [Post]
        searchPostsByTitle(search: String!): [Post]
        searchPostsByContent(search: String!): [Post]
        post(id: String!): Post
    }
`;
