import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Button, Card, Typography } from "@material-tailwind/react";
import moment from "moment";

const RequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch offered properties
  const { data: offered = [] } = useQuery({
    queryKey: ["offered"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offered/${user?.email}`);
      return data;
    },
  });

  console.log(offered);

  const TABLE_HEAD = [
    "Title",
    "Location",
    "Buyer Email",
    "Buyer Name",
    "Offered Amount",
    "Status",
    "Accept",
    "Reject",
  ];

  return (
    <div>
      <div className="p-2 sm:p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold">
          Requested Properties
        </Typography>
        <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
          List of Properties that buyers have offered an amount
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
            {offered.map(
              (
                { propertyTitle, propertyLocation, offeredPrice, buyer, offerStatus },
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
                        ${offeredPrice.minOffered} - ${offeredPrice.maxOffered}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600 capitalize"
                      >
                        {offerStatus}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Button size="sm"  color="green">
                        Accept
                      </Button>
                    </td>

                    <td className={classes}>
                      <Button size="sm" color="red">
                        Reject
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default RequestedProperties;
