import { Button, Card, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import EmptyPage from "../../../components/Shared/EmptyPage";

const TABLE_HEAD = [
  "Property Name",
  "Location",
  "Agent Name",
  "Agent Email",
  "Price Range",
  "Verify",
  "Reject",
];

export default function ManageProperties() {
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-properties`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleStatus = (id, status) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>Confirm verify this property?</Typography>
        <div className="space-x-4">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);
              const res = await axiosSecure.patch(`/all-properties/${id}`, {
                status,
              });
              if (res.data.modifiedCount > 0) {
                toast.success("Property status updated!");
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
      <DashboardHeader
        title={"Manage Properties"}
        description={"Oversee and maintain property listings on the platform."}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : properties.length === 0 ? (
        <>
          <EmptyPage message={"No properties have been added yet!"} />
        </>
      ) : (
        <>
          <Card className="h-[70vh] w-full overflow-scroll border border-gray-300 px-6 ">
            <table className="w-full min-w-max table-auto text-left">
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
                {properties.map(
                  (
                    {
                      agent,
                      title,
                      location,
                      max_price,
                      min_price,
                      _id,
                      status,
                    },
                    index
                  ) => {
                    const isLast = index === properties.length - 1;
                    const classes = isLast
                      ? "py-4"
                      : "py-4 border-b border-gray-300";

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {title}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {location}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {agent?.name}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            {agent?.email}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            ${min_price} - ${max_price}
                          </Typography>
                        </td>

                        {status === "Pending" ? (
                          <>
                            <td className={classes}>
                              <Button
                                size="sm"
                                color="teal"
                                onClick={() => handleStatus(_id, "Verified")}
                              >
                                Verify
                              </Button>
                            </td>

                            <td className={classes}>
                              <Button
                                size="sm"
                                className=" bg-red-500"
                                onClick={() => handleStatus(_id, "Rejected")}
                              >
                                Reject
                              </Button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className={classes}>
                              <Button
                                size="sm"
                                className={`${
                                  status === "Verified" && "bg-green-500"
                                } ${status === "Rejected" && "bg-red-500"}
                 
                        `}
                              >
                                {status}
                              </Button>
                            </td>

                            <td className={classes}>
                              <Button
                                size="sm"
                                className={`${
                                  status === "Verified" && "bg-green-500"
                                } ${status === "Rejected" && "bg-red-500"}
                 
                        `}
                              >
                                {status}
                              </Button>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </section>
  );
}
