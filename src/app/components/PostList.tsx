import React from 'react';
import PostCard from './PostCard';

interface PostListProps {
  posts: PostData[];
  highlighted: string;
}

const PostList: React.FC<PostListProps> = ({ posts, highlighted }) => {
  return (
    <ul className="space-y-4">
      {posts.map(({ id, title, date }) => (
        <PostCard key={id} id={id} title={title} date={date} highlighted={highlighted} />
      ))}
    </ul>
  );
};

export default PostList;
