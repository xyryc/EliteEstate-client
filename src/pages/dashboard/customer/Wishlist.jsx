import { useQuery } from "@tanstack/react-query";
import { Button, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, NavLink } from "react-router-dom";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EmptyPage from "../../../components/Shared/EmptyPage";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlistData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlistData"],
    enabled: !!user?.email,
    queryFn: async () => {
      // fetch a specific wishlisted property data
      const { data } = await axiosSecure.get(`/wishlist/${user?.email}`);
      return data;
    },
  });

  // delete wishlist
  const handleDeleteWishlist = (id) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-3 drop-shadow-2xl">
        <Typography>Remove from wishlist?</Typography>
        <div className="space-x-2">
          <Button
            size="sm"
            className="bg-green-500"
            onClick={async () => {
              toast.dismiss(t.id);

              // Delete user from MongoDB
              const res = await axiosSecure.delete(`/wishlist/${id}`);
              if (res.data.deletedCount > 0) {
                toast.success("Removed from wishlist!");

                refetch();
              } else {
                toast.error("Failed to remove from wishlit");
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
        title={"My Wishlist"}
        description={"Your curated list of favorite properties at a glance"}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : wishlistData.length === 0 ? (
        <>
          <EmptyPage message={"Nothing wishlisted yet"} />
          <Link to="/properties">
            <Button className="block mx-auto">Go To Properties</Button>
          </Link>
        </>
      ) : (
        <div className="space-y-2 px-4 h-[70vh] overflow-scroll">
          {wishlistData.map((item) => (
            <div
              className="flex flex-col lg:flex-row items-center border border-gray-300 rounded-lg p-4 gap-4"
              key={item._id}
            >
              {/* Property Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-md object-cover"
              />

              {/* Property Info */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">{item.location}</p>
                <p className="text-sm text-gray-600">
                  Price:{" "}
                  <span className="text-blue-500 font-medium">
                    {item.min_price} - {item.max_price} USD
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      item.status === "Verified"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </div>

              {/* Agent Info */}
              <div className="flex items-center space-x-2">
                <img
                  src={item.agent.image}
                  alt={item.agent.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.agent.name}
                  </p>
                  <p className="text-sm text-gray-600">{item.agent.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row xl:flex-col items-center sm:items-start gap-3">
                <NavLink to={`/dashboard/wishlist/offer/${item._id}`}>
                  <Button size="sm">Offer</Button>
                </NavLink>
                <Button
                  onClick={() => handleDeleteWishlist(item._id)}
                  color="red"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
