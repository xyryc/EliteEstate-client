import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LuHeart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useState } from "react";

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();
  const [open, setOpen] = useState(false);

  // fetch property data
  const { data: singleProp = {} } = useQuery({
    queryKey: ["singleProp"],
    queryFn: async () => {
      // fetch a specific verified property data
      const { data } = await axiosSecure.get(`/verifiedProperties/${id}`);
      return data;
    },
  });

  // fetch all review
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
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

  // review related
  const handleOpen = () => setOpen(!open);

  const handleReviewSubmit = async () => {
    const reviewDescription =
      document.getElementById("review-description").value; // Get review description
    const reviewTime = moment().valueOf(); // Current timestamp

    // Construct review data
    const reviewData = {
      propertyId: id,
      propertyTitle: title,
      agentName: agent?.name,
      reviewTime,
      reviewDescription,
      reviewerImage: user?.photoURL,
      reviewerEmail: user?.email,
      reviewerName: user?.displayName || "Anonymous",
    };

    try {
      // Send POST request with review data
      await axiosSecure.post("/reviews", reviewData);

      toast.success("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setOpen(false); // Close the modal
      refetch();
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-10">
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
              src={agent?.image}
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

      {/* Reviews Section */}
      <div className="my-10">
        <Button
          onClick={handleOpen}
          className="mb-10"
          disabled={role === "agent" || role === "admin"}
        >
          Add a review
        </Button>
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviewsLoading ? (
          <LoadingSpinner />
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to add one!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded-lg shadow-sm bg-gray-200 border-gray-300"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={
                      review.reviewerImage || "https://via.placeholder.com/50"
                    }
                    alt={review.reviewerName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{review.reviewerName}</p>
                    <p className="text-xs text-gray-500">
                      {moment(review.reviewTime).fromNow()}
                    </p>
                  </div>
                </div>
                <p>{review.reviewDescription}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} size="md" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Add a review
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-4 -mt-7 " color="gray" variant="lead">
            Write the message and then click the button.
          </Typography>
          <div className="grid gap-2">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Username
            </Typography>
            <Input
              label="Username"
              defaultValue={user?.displayName}
              readOnly
              disabled
            />
            <Textarea label="Review" id="review-description" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancel
          </Button>
          <Button variant="gradient" onClick={handleReviewSubmit}>
            Add review
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Details;
