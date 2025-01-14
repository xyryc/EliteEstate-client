import { Button, Card, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const TABLE_HEAD = [
  "Title",
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
    // refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-properties`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  console.log(properties);

  return (
    <section className="w-full bg-white">
      <div className="p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold">
          Property Verification and Approval
        </Typography>
        <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
          Overview of the key personnel involved in our project and their
          geographical distribution.
        </Typography>
      </div>
      <Card className="h-full w-full overflow-scroll border border-gray-300 px-6">
        <table className="w-full min-w-max table-auto text-left">
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
            {properties.map(
              ({ agent, title, location, max_price, min_price }, index) => {
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

                    <td className={classes}>
                      <Button size="sm">Verify</Button>
                    </td>

                    <td className={classes}>
                      <Button
                        size="sm"
                        className="bg-red-500 text-white border-none"
                      >
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
    </section>
  );
}
