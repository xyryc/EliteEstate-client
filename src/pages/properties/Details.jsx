import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LuHeart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  const { data: singleProp = {} } = useQuery({
    queryKey: ["singleProp"],
    queryFn: async () => {
      // fetch a specific verified property data
      const { data } = await axiosSecure.get(`/verifiedProperties/${id}`);
      return data;
    },
  });

  const { agent, image, title, location, max_price, min_price, status } =
    singleProp;

  // wishlist
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (wishlistData) => {
      await axiosSecure.post(`/wishlist`, wishlistData);
    },
    onSuccess: () => {
      toast.success("Added to wishlist!");
      navigate("/dashboard/wishlist");
    },
    onError: () => {
      toast.error("Failed to Wishlist!");
    },
  });

  const addToWishList = async () => {
    // eslint-disable-next-line no-unused-vars
    const { _id, ...rest } = singleProp;
    const wishlistData = { ...rest, propertyId: id, email: user?.email };
    await mutateAsync(wishlistData);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-10">
        <div>
          <h1 className="text-4xl font-bold capitalize">{title}</h1>
          <div className="flex mt-2 mb-4 gap-3 items-center">
            <p className="opacity-75 flex items-center gap-2">
              <IoLocationOutline />
              {location}
            </p>

            <p className="bg-light-green-200 text-light-green-800  font-bold text-xs px-3 py-1 rounded-full">
              {status}
            </p>
          </div>

          <img
            src={image}
            alt={title}
            className="h-96 w-full object-cover rounded-xl"
          />
        </div>

        <div className="mt-20">
          <h4 className="font-bold text-xl  mb-4">Property Description</h4>
          <p>
            Discover this verified property, beautifully located in {location},
            offering exceptional value with prices starting at just ${min_price}{" "}
            and going up to ${max_price}. Listed by our trusted agent,{" "}
            {agent?.name}, this property ensures quality and reliability. Its
            verified status guarantees a secure investment opportunity for your
            future home or real estate portfolio. Don’t miss out on this
            incredible chance to own a property in {location}!
          </p>

          <h3 className="font-bold mt-4 mb-2">Agent Information</h3>
          <div className="flex items-center gap-4">
            <img
              src={
                agent?.image ||
                "https://i.ibb.co.com/rQmdnVw/IMG-2268-cropped-prev-ui.png"
              }
              alt={agent?.name}
              className="h-16 w-16 object-cover rounded-full"
            />
            <p className="text-xl font-semibold">{agent?.name}</p>
          </div>

          <p className="font-bold text-2xl mt-3">
            ${min_price} - ${max_price}
          </p>

          <Button
            className="mt-2 flex items-center gap-2"
            onClick={() => addToWishList()}
            disabled={role === "agent" || role === "admin"}
          >
            <LuHeart />
            Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Details;
