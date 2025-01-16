import { Card, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const TABLE_HEAD = [
    "Property Title",
    "Location",
    "Buyer Email",
    "Buyer Name",
    "Sold Price",
    "Transaction ID",
    "Transaction Date",
  ];

  const {
    data: soldProperties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sold-properties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/sold-properties/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <p>Loading sold properties...</p>;
  }

  if (isError) {
    return <p>Failed to load sold properties. Please try again later.</p>;
  }

  return (
    <div>
      <div className="p-2 sm:p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold">
          Sold Properties
        </Typography>
        <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
          List of properties sold by you
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
            {soldProperties.map(
              (
                {
                  propertyTitle,
                  propertyLocation,
                  offeredPrice,
                  buyer,
                  paymentInfo,
                },
                index
              ) => {
                const isLast = index === soldProperties.length - 1;
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
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {paymentInfo?.transactionId || "N/A"}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-normal text-gray-600"
                      >
                        {paymentInfo?.transactionDate
                          ? new Date(
                              paymentInfo.transactionDate
                            ).toLocaleString()
                          : "N/A"}
                      </Typography>
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

export default SoldProperties;
