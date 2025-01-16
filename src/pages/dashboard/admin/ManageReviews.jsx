import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all reviews
  const { data: allReviews = [], refetch, isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews`);
      return data;
    },
  });

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
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>
      {allReviews.length === 0 ? (
        <p>No reviews found!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
          {allReviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border border-gray-400 rounded-lg shadow-sm bg-gray-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={review.reviewerImage || "https://via.placeholder.com/150"}
                  alt={review.reviewerName || "Anonymous"}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg">
                    {review.reviewerName || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {review.reviewerEmail || "No email provided"}
                  </p>
                </div>
              </div>
              <p className="mt-4">{review.reviewDescription}</p>
              <Button
              size="sm"
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

export default ManageReviews;
