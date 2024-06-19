// components/PostList.tsx
import React from 'react';
import PostCard from './PostCard';

interface PostListProps {
  posts: PostData[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <ul className="space-y-4">
      {posts.map(({ id, title, date }) => (
        <PostCard key={id} id={id} title={title} date={date} />
      ))}
    </ul>
  );
};

export default PostList;
