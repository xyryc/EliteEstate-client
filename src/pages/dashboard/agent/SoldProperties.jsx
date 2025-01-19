import { Card, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import moment from "moment";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EmptyPage from "../../../components/Shared/EmptyPage";

const SoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const TABLE_HEAD = [
    "Property Title",
    "Location",
    "Buyer Email",
    "Buyer",
    "Sold",
    "Transaction ID",
    "Transaction Date",
  ];

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/sold-properties/${user?.email}`);
      return data;
    },
  });

  // Calculate the total sold amount
  const totalSoldAmount = soldProperties.reduce(
    (sum, property) => sum + (property.offeredPrice || 0),
    0
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <DashboardHeader
          title={"Sold Properties"}
          description={"Keep track of all your sold properties in one place"}
        />

        <Typography variant="lead" color="blue-gray" className="font-bold">
          Revenue: ${totalSoldAmount}
        </Typography>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : soldProperties.length === 0 ? (
        <EmptyPage message={"No sold properties yet!"} />
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
                            ? moment(paymentInfo.transactionDate).format(
                                "DD/MM/yy, h:mm a"
                              )
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
      )}
    </div>
  );
};

export default SoldProperties;
