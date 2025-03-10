import { Button, Card, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import moment from "moment";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import EmptyPage from "../../../components/Shared/EmptyPage";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Name",
  "Email",
  "Created At",
  "Role",
  "Make Admin",
  "Make Agent",
  "Mark as Fraud",
  "Delete User",
];

export default function ManageUsers() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user?.email}`);
      return data;
    },
  });

  const handleRole = (id, role) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>{`Make ${role}?`}</Typography>
        <div className="space-x-2">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);
              const res = await axiosSecure.patch(`/users/${id}`, {
                role,
              });
              if (res.data.modifiedCount > 0) {
                toast.success("Role updated!");
                refetch();
              }
            }}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            className="bg-red-500"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  // delete user
  const handleDeleteUser = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>Delete this user?</Typography>
        <div className="space-x-2">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);

              // Delete user from MongoDB
              const mongoRes = await axiosSecure.delete(`/users/${id}`);
              if (mongoRes.data.deletedCount > 0) {
                toast.success("User deleted successfully!");

                refetch(); // Refresh the data if needed
              } else {
                toast.error("Failed to delete the user from MongoDB!");
              }
            }}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            className="bg-red-500"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const handleFraud = (email) => {
    const fraud = true;

    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>
          Mark this agent as fraud? All their added properties will be deleted.
        </Typography>
        <div className="space-x-2">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);

              await axiosSecure.patch(`/users/fraud/${email}`, {
                fraud,
              });

              toast.success(
                "User marked as fraud and their properties removed!"
              );
              refetch();
            }}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            className="bg-red-500"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <section className="w-full bg-white">
      <DashboardHeader
        title={"Team Members and Roles"}
        description={"Administer user accounts and permissions effectively."}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <>
          <EmptyPage message={"No users yet"} />
          <Link to="/">
            <Button className="block mx-auto">Home</Button>
          </Link>
        </>
      ) : (
        <Card className="h-[70vh] md:w-[60vw] xl:w-full overflow-scroll border border-gray-300 px-6">
          <table className="w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray-300 pb-4 pt-10"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(
                ({ name, role, email, timestamp, _id, fraud }, index) => {
                  const isLast = index === users.length - 1;
                  const classes = isLast
                    ? "py-4"
                    : "py-4 border-b border-gray-300";

                  return (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {moment(timestamp).format("DD/MM/YY")}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {role}
                        </Typography>
                      </td>

                      <td className={classes}>
                        {fraud ? (
                          <Button size="sm" color="amber">
                            Fraud
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            color="green"
                            onClick={() => handleRole(_id, "admin")}
                          >
                            Edit
                          </Button>
                        )}
                      </td>

                      <td className={classes}>
                        {fraud ? (
                          <Button size="sm" color="amber">
                            Fraud
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            color="teal"
                            onClick={() => handleRole(_id, "agent")}
                          >
                            Edit
                          </Button>
                        )}
                      </td>

                      {role === "agent" ? (
                        <td className={classes}>
                          {fraud ? (
                            <Button size="sm" color="amber">
                              Fraud
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              color="amber"
                              onClick={() => handleFraud(email)}
                            >
                              Mark
                            </Button>
                          )}
                        </td>
                      ) : (
                        <td className={classes}>-</td>
                      )}

                      <td className={classes}>
                        <Button
                          size="sm"
                          className="bg-red-500"
                          onClick={() => handleDeleteUser(_id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      )}
    </section>
  );
}
