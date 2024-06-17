
import PostCard from './components/PostCard';
import { fetchAllPostInfo } from '../lib/graphql-service';

const Home = async () => {
  const posts = await fetchAllPostInfo();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search blog posts..."
          className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ul className="space-y-4">
        {posts.map(({ id, title, date }) => (
          <PostCard key={id} id={id} title={title} date={date} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
