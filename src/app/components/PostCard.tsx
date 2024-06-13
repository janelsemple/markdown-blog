import Link from 'next/link';

interface PostCardProps {
  id: string;
  title: string;
  date: string;
}

const PostCard = ({ id, title, date }: PostCardProps) => {
  return (
    <li key={id}>
      <Link href={`/posts/${id}`}>
        <h2>{title}</h2>
        <p>{date}</p>
      </Link>
    </li>
  );
};

export default PostCard;
