// src/app/search/page.tsx
import { searchPosts } from '../../lib/graphql-service';
import SearchBar from '../components/SearchBar';
import PostList from '../components/PostList';
import Link from "next/link";

interface SearchPageProps {
  searchParams: { query?: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = searchParams.query || '';
  let posts: PostData[] = [];

  if (query) {
    try {
      posts = await searchPosts(query);
      if (posts === undefined || posts.length === 0) {
        console.log('No results found for query:', query);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Search Results</h1>
      <SearchBar defaultQuery={query} />
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-center">No results found for "{query}".</p>
      )}
      <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
    </div>
  );
};

// This tells Next.js to render this page dynamically
export const dynamic = 'force-dynamic';

export default SearchPage;
