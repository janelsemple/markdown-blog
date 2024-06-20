import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type Post {
        id: String!
        title: String!
        date: String!
        content: String!
    }

    type PostSearchResult {
        titleMatches: [Post]
        contentMatches: [Post]
    }

    type Query {
        posts: [Post]
        searchPosts(search: String!): PostSearchResult
        post(id: String!): Post
    }
`;
