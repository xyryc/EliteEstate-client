import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user's reviews
  const {
    data: myReviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-reviews/${user?.email}`);
      return data;
    },
  });

  console.log(myReviews);

  // Delete a review
  const { mutateAsync: deleteReview } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete the review!");
    },
  });

  const handleDelete = async (id) => {
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
              await deleteReview(id);
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
      {myReviews.length === 0 ? (
        <p>No reviews yet. Start adding reviews to see them here!</p>
      ) : (
        <div className="space-y-4">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50"
            >
              <h3 className="font-bold text-lg">{review.propertyTitle}</h3>
              <p className="text-sm text-gray-600">Agent: {review.agentName}</p>
              <p className="text-xs text-gray-500">
                Reviewed: {moment(review.reviewTime).fromNow()}
              </p>
              <p className="mt-2">{review.reviewDescription}</p>
              <Button
                color="red"
                className="mt-3"
                onClick={() => handleDelete(review._id)}
              >
                Delete Review
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
