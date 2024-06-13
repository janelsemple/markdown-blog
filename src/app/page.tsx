import { getSortedPostsData, PostData } from '../lib/posts';
import PostCard from './components/PostCard';

const fetchPosts = async (): Promise<PostData[]> => {
  return getSortedPostsData();
};

const Home = async () => {
  const posts = await fetchPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map(({ id, title, date }) => (
          <PostCard key={id} id={id} title={title} date={date} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
