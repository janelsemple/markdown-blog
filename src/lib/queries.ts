// lib/queries.ts
import { gql } from '@apollo/client';

export const GET_POST_TITLES_AND_DATES = gql`
  query GetPostTitlesAndDates {
    posts {
      id
      title
      date
    }
  }
`;

export const GET_POST_IDS = gql`
  query GetPosts {
    posts {
      id
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPost($id: String!) {
    post(id: $id) {
      id
      title
      date
      content
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($query: String!) {
    searchPosts(search: $query) {
      titleMatches {
        id
        title
        date
      }
      contentMatches {
        id
        title
        date
      }
    }
  }
`;
