import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Button, Card, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import EmptyPage from "../../../components/Shared/EmptyPage";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const TABLE_HEAD = [
    "Image",
    "Property Name",
    "Price Range",
    "Agent Name",
    "Advertise",
  ];

  const {
    data: verifiedProps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedProps"],

    queryFn: async () => {
      // fetch all verified properties
      const { data } = await axiosSecure.get(`/verifiedProperties`);
      return data;
    },
  });

  //   advertise property
  const handleAdvertisement = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>Advertise Property on the Homepage?</Typography>
        <div className="space-x-4">
          <Button
            size="sm"
            color="green"
            onClick={async () => {
              toast.dismiss(t.id);
              const res = await axiosSecure.patch(`/advertise/${id}`);
              if (res.data.modifiedCount > 0) {
                toast.success("Property status updated!");
                refetch();
              }
            }}
          >
            Confirm
          </Button>
          <Button size="sm" color="red" onClick={() => toast.dismiss(t.id)}>
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <section className="w-full bg-white">
      <DashboardHeader
        title={"Advertise Properties"}
        description={
          "Review and approve verified property listings submitted and by agents"
        }
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : verifiedProps.length === 0 ? (
        <>
          <EmptyPage message={"No verified properties yet"} />
          <Link to="/">
            <Button className="block mx-auto">Home</Button>
          </Link>
        </>
      ) : (
        <Card className="h-[70vh] w-full overflow-scroll border border-gray-300 px-6">
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
              {verifiedProps.map(
                (
                  { agent, title, max_price, min_price, image, _id, advertise },
                  index
                ) => {
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

                      {advertise ? (
                        <td className={classes}>
                          <Button size="sm" variant="gradient" color="green">
                            Advertising
                          </Button>
                        </td>
                      ) : (
                        <td className={classes}>
                          <Button
                            size="sm"
                            variant="gradient"
                            color="teal"
                            onClick={() => handleAdvertisement(_id)}
                          >
                            Advertise
                          </Button>
                        </td>
                      )}
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
};

export default AdvertiseProperty;
