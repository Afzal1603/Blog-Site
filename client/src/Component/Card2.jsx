import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
const Card2 = ({ users }) => {
  return (
    <div className="flex-1 max-w-[300px] min-w-[250px] bg-slate-200 dark:bg-slate-700 shadow-xl py-2 px-3 rounded-xl">
      <div className="flex justify-between mx-2 my-2 items-center">
        <h1>Recent Users</h1>
        <Link to="/dashboard?tab=users">
          <Button gradientDuoTone="purpleToPink" outline>
            See all
          </Button>
        </Link>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User Image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {users.length > 0 ? (
            users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={user.image || "https://via.placeholder.com/50"}
                    alt={user.name || "Unknown User"}
                  />
                </Table.Cell>
                <Table.Cell>{user.name || "Unknown"}</Table.Cell>
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

export default Card2;
