/* eslint-disable react/prop-types */
import { IoLocationOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { IconButton } from "@material-tailwind/react";

const Card = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [role] = useRole();
  const { user } = useAuth();

  // wishlist
  const { mutateAsync } = useMutation({
    mutationFn: async (wishlistData) => {
      await axiosSecure.post(`/wishlist`, wishlistData);
    },
    onSuccess: () => {
      toast.success("Added to wishlist!");
    },
    onError: () => {
      toast.error("Failed to Wishlist!");
    },
  });

  const addToWishList = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // eslint-disable-next-line no-unused-vars
    const { _id, ...rest } = item;
    const wishlistData = { ...rest, propertyId: item._id, email: user?.email };
    await mutateAsync(wishlistData);
  };

  const isValidImageUrl = (url) => {
    try {
      // Check if the URL is a valid string and ends with common image file extensions
      return (
        typeof url === "string" &&
        (url.startsWith("http://") || url.startsWith("https://")) &&
        /\.(jpg|jpeg|png|webp|gif|bmp)$/i.test(url)
      );
    } catch {
      return false;
    }
  };

  return (
    <Link
      to={`/properties/details/${item._id}`}
      key={item._id}
      className="border border-gray-400 rounded-xl"
    >
      <img
        src={item.image}
        alt={item.title}
        className="rounded-t-xl h-52 object-cover w-full"
      />

      <div className="p-4">
        <h3 className="font-semibold text-xl">{item.title}</h3>

        <div className="flex items-center gap-4">
          <p className="opacity-70 text-lg font-semibold my-1">
            ${item.min_price} - ${item.max_price}
          </p>
          <p className="bg-light-green-200 text-light-green-800  font-bold text-xs px-3 py-1 rounded-full">
            {item.status}
          </p>
        </div>

        <p className="flex items-center gap-1 text-sm opacity-70">
          <IoLocationOutline />
          {item.location}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={
                isValidImageUrl(item.agent?.image)
                  ? item.agent.image
                  : "https://i.ibb.co/2Z0VHgk/miriyam.jpg"
              }
              alt={item.agent.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="capitalize opacity-70">{item.agent.name}</p>
          </div>

          <IconButton
            variant="text"
            onClick={(e) => {
              addToWishList(e);
            }}
            disabled={role === "agent" || role === "admin"}
          >
            <LuHeart className="text-2xl opacity-70" />
          </IconButton>
        </div>
      </div>
    </Link>
  );
};

export default Card;
