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
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddedProperties() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/properties/${user?.email}`);
      return data;
    },
  });

  const handleDeleteProperty = async (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <p>Are you sure you want to delete this item?</p>
        <div className="space-x-4">
          <Button
            className="btn btn-error btn-xs text-white"
            onClick={async () => {
              toast.dismiss(t.id);
              const res = await axiosSecure.delete(`/properties/${id}`);
              if (res.data.deletedCount > 0) {
                toast.success("Item deleted!");
                refetch();
              }
            }}
          >
            Confirm
          </Button>
          <Button
            className="btn btn-success btn-xs text-white"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center place-items-center gap-6 px-4">
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
            {item.status === "Rejected" ? (
              ""
            ) : (
              <Link to={`/dashboard/addedProperties/update/${item._id}`}>
                <Button>Update</Button>
              </Link>
            )}
            <Button onClick={() => handleDeleteProperty(item._id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
