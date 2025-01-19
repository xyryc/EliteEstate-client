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
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import EmptyPage from "../../../components/Shared/EmptyPage";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaTrash, FaEdit } from "react-icons/fa";

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
            size="sm"
            color="green"
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
            size="sm"
            color="red"
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
    <div>
      <DashboardHeader
        title={"Added Properties"}
        description={"View and manage properties you've successfully added"}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : properties.length === 0 ? (
        <>
          <EmptyPage message={"No added properties yet!"} />
          <Link to="/properties">
            <Button className="block mx-auto">Home</Button>
          </Link>
        </>
      ) : (
        <div className="h-[70vh] p-4 overflow-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties?.map((item) => (
            <Card className="mt-4 shadow-lg" key={item._id}>
              {/* Card Header with Image */}
              <CardHeader className="relative h-48">
                <img
                  className="h-full w-full object-cover"
                  src={item.image}
                  alt={item.title}
                />
              </CardHeader>

              {/* Card Body */}
              <CardBody>
                <Typography
                  variant="h6"
                  className="font-semibold text-blue-gray-800"
                >
                  {item.title}
                </Typography>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MdLocationOn className="mr-1" />
                  {item.location}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <MdAttachMoney className="mr-1" />
                  {item.min_price} - {item.max_price}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <AiOutlineUser className="mr-1" />
                  <Avatar
                    src={item.agent.image}
                    alt={item.agent.name}
                    size="xs"
                    className="mr-2"
                  />
                  {item.agent.name}
                </div>
                <Typography variant="small" className={`mt-2 text-sm`}>
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      (item.status === "Rejected" && "text-red-500") ||
                      (item.status === "Pending" && "text-amber-500") ||
                      (item.status === "Verified" && "text-green-500")
                    }`}
                  >
                    {item.status}
                  </span>
                </Typography>
              </CardBody>

              {/* Card Footer */}
              <CardFooter className="flex flex-row md:flex-col xl:flex-row justify-between items-center gap-2 p-4">
                {item.status !== "Rejected" && (
                  <Link to={`/dashboard/addedProperties/update/${item._id}`}>
                    <Button size="sm" className="flex items-center gap-1">
                      <FaEdit />
                      Update
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  color="red"
                  className="flex items-center gap-1"
                  onClick={() => handleDeleteProperty(item._id)}
                >
                  <FaTrash />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
