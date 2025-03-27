import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const Card4 = ({ posts }) => {
  return (
    <div className=" max-w-[400px] min-w-[300px] bg-slate-200 dark:bg-slate-700 shadow-xl py-2 px-3 rounded-xl">
      <div className="flex justify-between mx-2 my-2 items-center">
        <h1>Recent Posts</h1>
        <Link to="/dashboard?tab=posts">
          <Button gradientDuoTone="purpleToPink" outline>
            See all
          </Button>
        </Link>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Post Image</Table.HeadCell>
          <Table.HeadCell>Post Title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Table.Row key={post._id}>
                <Table.Cell>
                  <img
                    className="w-30 h-10 object-cover rounded-lg"
                    src={post.image || "https://via.placeholder.com/50"}
                    alt={post.title}
                  />
                </Table.Cell>
                <Table.Cell className="line-clamp-1">
                  {post.title || "Unknown"}
                </Table.Cell>
                <Table.Cell>{post.category || "uncategorised"}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={2} className="text-center">
                No users found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Card4;
