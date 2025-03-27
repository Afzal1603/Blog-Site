import { FaLongArrowAltUp } from "react-icons/fa";

const Card1 = ({ name, count, icon, lastMonth }) => {
  if (!count) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="flex w-[300px] p-4 shadow-lg bg-slate-200 dark:bg-slate-700 rounded-xl justify-between">
      <div>
        <h1 className="text-xl text-zinc-600 dark:text-slate-300">{name}</h1>
        <h1 className="text-2xl font-semibold text-zinc-600 dark:text-slate-400">
          {count}
        </h1>
        <p className="flex items-center text-md font-semibold">
          <FaLongArrowAltUp className="text-teal-500" />
          <span className="text-teal-500 font-semibold mr-2 text-lg">
            {lastMonth}
          </span>
          Last Month
        </p>
      </div>
      <span className="text-color-white dark:text-white text-2xl bg-teal-300 dark:bg-teal-800 p-3 h-12 rounded-full">
        {icon}
      </span>
    </div>
  );
};

export default Card1;
