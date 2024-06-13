import ReactMarkdown from 'react-markdown';
import { getAllPostIds, getPostData, PostData } from '../../../lib/posts';

interface PostProps {
  params: {
    id: string;
  };
}

const Post = async ({ params }: PostProps) => {
  const post = await getPostData(params.id);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  );
};

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => path.params);
}

export default Post;