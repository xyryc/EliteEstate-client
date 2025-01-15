import { Button, Card, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TABLE_HEAD = [
  "Name",
  "Email",
  "Created At",
  "Role",
  "Make Admin",
  "Make Agent",
  "Delete User",
  "Mark as Fraud",
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

  if (isLoading) return <LoadingSpinner />;

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

  const handleDeleteUser = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>Delete user?</Typography>
        <div className="space-x-2">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);
              const res = await axiosSecure.delete(`/users/${id}`);
              if (res.data.deletedCount > 0) {
                toast.success("User deleted!");
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

  return (
    <section className="w-full bg-white">
      <div className="p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold">
          Team members and roles
        </Typography>
        <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
          Overview of the key personnel involved in our project and their
          geographical distribution.
        </Typography>
      </div>
      <Card className="h-full w-full overflow-scroll border border-gray-300 px-6">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
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
            {users.map(({ name, role, email, timestamp, _id }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

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
                      {timestamp}
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
                    <Button
                      size="sm"
                      className="bg-purple-500"
                      onClick={() => handleRole(_id, "admin")}
                    >
                      Edit
                    </Button>
                  </td>

                  <td className={classes}>
                    <Button
                      size="sm"
                      className="bg-blue-gray-500"
                      onClick={() => handleRole(_id, "agent")}
                    >
                      Edit
                    </Button>
                  </td>

                  <td className={classes}>
                    <Button
                      size="sm"
                      className="bg-red-500"
                      onClick={() => handleDeleteUser(_id)}
                    >
                      Delete
                    </Button>
                  </td>

                  <td className={classes}>
                    <Button size="sm" className="bg-amber-500">
                      Mark
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </section>
  );
}
