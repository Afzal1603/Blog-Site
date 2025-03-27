import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const Card3 = ({ comments }) => {
  // Function to truncate long comments
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className=" w-[300px]  bg-slate-200 dark:bg-slate-700 shadow-xl py-2 px-3 rounded-xl">
      <div className="flex justify-between mx-2 my-2 items-center">
        <h1>Recent Comments</h1>
        <Link to="/dashboard?tab=comments">
          <Button gradientDuoTone="purpleToPink" outline>
            See all
          </Button>
        </Link>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Comment</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Table.Row key={comment._id}>
                <Table.Cell className="line-clamp-1">
                  {truncateText(comment.content)}
                </Table.Cell>
                <Table.Cell>{comment.likesCount}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2} className="text-center">
                No comments found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Card3;
