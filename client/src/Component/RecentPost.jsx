import { Link } from "react-router-dom";

const RecentPost = ({ post }) => {
  return (
    <div className="group mb-3 relative w-full md:max-w-[350px] border h-[350px] overflow-hidden hover:border-2 border-teal-500 rounded-lg">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] translate-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md rounded-tl-none m-2"
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default RecentPost;
