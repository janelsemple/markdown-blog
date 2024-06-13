import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  date: string;
}

/**
 * A component that displays a card for a blog post.
 */
const PostCard = ({ id, title, date }: PostCardProps) => {
  return (
    <li className="border border-gray-300 rounded-md p-4 hover:bg-gray-100">
      <Link href={`/posts/${id}`}>
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{date}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostCard;
