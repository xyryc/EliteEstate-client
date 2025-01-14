import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

export default function AddedProperties() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["properties", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/properties`);
      return data;
    },
  });

  console.log(properties);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center gap-6 px-4">
      {properties?.map((item) => (
        <Card className="mt-6" key={item._id}>
          <CardHeader color="blue-gray" className="relative h-56 min-w-80">
            <img
              className="h-full w-full object-cover"
              src={item.image}
              alt={item.title}
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.title}
            </Typography>
            <Typography variant="lead">{item.location}</Typography>
            <div className="flex gap-2">
              <Typography>Min Price: ${item.min_price}</Typography>
              <Typography>Max Price: ${item.max_price}</Typography>
            </div>

            <Typography>
              Agent Info: <Avatar src={item.agent.image} alt="avatar" /> (
              {item.agent.name})
            </Typography>

            <Typography>Status: {item.status}</Typography>
          </CardBody>
          <CardFooter className="flex gap-2">
            <Button>Update</Button>
            <Button>Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
