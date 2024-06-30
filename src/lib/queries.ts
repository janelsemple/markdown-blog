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

export const SEARCH_POSTS_BY_TITLE = gql`
  query SearchPostsByTitle($query: String!) {
    searchPostsByTitle(search: $query) {
      id
      title
      date
    }
  }
`;

export const SEARCH_POSTS_BY_CONTENT = gql`
  query SearchPostsByContent($query: String!) {
    searchPostsByContent(search: $query) {
      id
      title
      date
    }
  }
`;

export const SEARCH_IMAGES_BY_ALT = gql`
query SearchImagesByAlt($query: String!) {
    searchImagesByAltText(altText: $query) {
      alt
      url
      postId
    }
  }
`;