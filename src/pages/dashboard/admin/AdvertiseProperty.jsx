import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const TABLE_HEAD = [
    "Image",
    "Property Name",
    "Price Range",
    "Agent Name",
    "Advertise",
  ];

  const { data: verifiedProps = [] } = useQuery({
    queryKey: ["verifiedProps"],

    queryFn: async () => {
      // fetch all verified properties
      const { data } = await axiosSecure.get(`/verifiedProperties`);
      return data;
    },
  });

  return (
    <section className="w-full bg-white">
      <div className="p-6">
        <Typography variant="lead" color="blue-gray" className="font-bold">
          Advertise Property
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
            {verifiedProps.map(
              ({ agent, title, max_price, min_price, image }, index) => {
                const isLast = index === verifiedProps.length - 1;
                const classes = isLast
                  ? "py-4"
                  : "py-4 border-b border-gray-300";

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className={classes}>
                      <img
                        src={image}
                        alt={title}
                        className="h-20 rounded-md"
                      />
                    </td>

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
                        ${min_price} - ${max_price}
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
                      <Button size="sm" variant="gradient" color="teal">
                        Advertise
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
};

export default AdvertiseProperty;
