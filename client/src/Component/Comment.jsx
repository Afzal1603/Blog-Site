import { BiSolidLike } from "react-icons/bi";

const Comment = ({ image, name, email, content }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 ml-4 mb-4">
      <div className="w-32 h-auto rounded-full overflow-hidden">
        <img className="h-14 w-14" src={image} alt="" />
      </div>
      <div>
        <h1 className="text-sm mb-2 font-bold flex flex-col md:flex-row">
          @{email}{" "}
          <span className="font-light italic text-slate-400">
            created a month ago
          </span>
        </h1>
        <p className="text-xs ">{content}</p>
        <div className="ml-2 flex gap-4 border-t-2 border-slate-500  mt-2 pt-2 w-fit font-light text-sm">
          <span>
            <BiSolidLike size={20}></BiSolidLike>
          </span>
          <span>Edit</span>
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
