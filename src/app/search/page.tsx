import React from 'react';
import PostList from '../components/PostList';
import { searchPostsByTitle, searchPostsByContent, searchImagesByAlt, fetchAllPostInfo } from '../../lib/graphql-service';
import SearchBar from '../components/SearchBar';
import MasonryLayout from '../components/MasonryLayout';

interface SearchPageProps {
  searchParams: { search?: string; filter?: string };
}

const Search = async ({ searchParams }: SearchPageProps) => {
  const search = searchParams.search || '';
  const filter = searchParams.filter || 'title';
  let posts: PostData[] = [];
  let images: ImageSearchResult[] = [];
  let error: string | null = null;

  try {
    if (search && filter) {
      if (filter === 'title') {
        posts = await searchPostsByTitle(search);
      } else if (filter === 'content') {
        posts = await searchPostsByContent(search);
      } else if (filter === 'images') {
        images = await searchImagesByAlt(search);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      error = `An error occurred while searching for posts: ${err.message}`;
    } else {
      error = 'An unknown error occurred while searching for posts';
    }
    console.error('Error searching for posts:', err);
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <div className="flex justify-center mb-4">
        <SearchBar query={search} filter={filter} />
      </div>
      {error && (
        <p className="text-2xl font-bold mb-4 text-red-500 text-center">{error}</p>
      )}
      {posts.length === 0 && images.length === 0 && !error && (
        <p className="text-2xl font-bold mb-4 text-center">No results found</p>
      )}
      {posts.length > 0 && filter === 'title' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Matches found in title</h2>
          <PostList posts={posts} highlighted={search} />
        </>
      )}
      {posts.length > 0 && filter === 'content' && (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-8">Matches found in content</h2>
          <PostList posts={posts} highlighted={search} />
        </>
      )}
      {images.length > 0 && filter === 'images' && (
        <>
          <h2 className="text-2xl font-bold mb-4 mt-8">Matches found in images</h2>
          <MasonryLayout images={images} />
        </>
      )}
    </div>
  );
};

// This tells Next.js to render this page dynamically
export const dynamic = 'force-dynamic';

export default Search;
