import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Button, Card, Typography } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EmptyPage from "../../../components/Shared/EmptyPage";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const TABLE_HEAD = [
    "Title",
    "Location",
    "Buyer Email",
    "Buyer Name",
    "Offered Price",
    "Accept",
    "Reject",
  ];

  // Fetch offered properties
  const {
    data: offered = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["offered"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offered/${user?.email}`);
      return data;
    },
  });

  // accept / reject
  const handleStatus = (id, status) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography className="capitalize">{`${status} offer?`}</Typography>
        <div className="space-x-2">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);

              // send req
              try {
                const res = await axiosSecure.patch(`/offered/status/${id}`, {
                  status,
                });

                // Display success message
                toast.success(res?.data?.message);
                refetch();
                // eslint-disable-next-line no-unused-vars
              } catch (error) {
                toast.error("Failed to update offer status.");
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
    <div>
      <DashboardHeader
        title={"Requested Properties"}
        description={"Manage property inquiries and requests effortlessly"}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : offered.length === 0 ? (
        <EmptyPage message={"No request yet!"}  />
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
              {offered.map(
                (
                  {
                    propertyTitle,
                    propertyLocation,
                    offeredPrice,
                    buyer,
                    offerStatus,
                    _id,
                  },
                  index
                ) => {
                  const isLast = index === offered.length - 1;
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
                          {propertyTitle}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {propertyLocation}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {buyer?.email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {buyer?.name}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          ${offeredPrice}
                        </Typography>
                      </td>

                      <td className={classes}>
                        {offerStatus === "pending" ? (
                          <Button
                            size="sm"
                            color="teal"
                            onClick={() => handleStatus(_id, "accepted")}
                          >
                            Accept
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            color={`${
                              offerStatus === "accepted" ? "green" : "red"
                            }`}
                          >
                            {offerStatus}
                          </Button>
                        )}
                      </td>

                      <td className={classes}>
                        {offerStatus === "pending" ? (
                          <Button
                            size="sm"
                            color="red"
                            onClick={() => handleStatus(_id, "rejected")}
                          >
                            Reject
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            color={`${
                              offerStatus === "accepted" ? "green" : "red"
                            }`}
                          >
                            {offerStatus}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

export default RequestedProperties;
