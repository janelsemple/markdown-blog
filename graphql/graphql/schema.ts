import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Post {
        id: String!
        title: String!
        date: String!
        content: String!
    }

    type ImageSearchResult {
        url: String!
        postId: String!
        alt: String!
    }

    type Query {
        posts: [Post]
        searchPostsByTitle(search: String!): [Post]
        searchPostsByContent(search: String!): [Post]
        post(id: String!): Post
        searchImagesByAltText(altText: String!): [ImageSearchResult]
    }

    type Mutation {
        ensureIndex: String!
    }
`;
