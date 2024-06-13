import { getSortedPostsData, PostData } from "../lib/posts";
import PostCard from "./components/PostCard";

/**
 * Fetches the sorted blog post data.
 */
const fetchPosts = async (): Promise<PostData[]> => {
  return getSortedPostsData();
};

/**
 * The homepage component that displays a list of blog posts.
 */
const Home = async () => {
  const posts = await fetchPosts();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-4">
        {posts.map(({ id, title, date }) => (
          <PostCard key={id} id={id} title={title} date={date} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
