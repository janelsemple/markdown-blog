// src/app/page.tsx (Home Page)
import { fetchAllPostInfo } from '../lib/graphql-service';
import PostList from './components/PostList';

const Home = async () => {
  const posts = await fetchAllPostInfo();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <form action="/search" method="get" className="flex justify-center mb-8">
        <input
          type="text"
          name="query"
          placeholder="Search blog posts..."
          className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </form>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;
