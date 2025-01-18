import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import moment from "moment";
import { Button } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import DashboardHeader from "../../../components/Shared/DashboardHeader";

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
    <div>
      <DashboardHeader
        title={"My Reviews"}
        description={"Manage and reflect on your feedback history"}
      />

      {myReviews.length === 0 ? (
        <p>No reviews yet. Start adding reviews to see them here!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="p-4 border rounded-xl shadow-sm border-gray-400 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{review.propertyTitle}</h3>
                <p className="text-sm text-gray-600">
                  Agent: {review.agentName}
                </p>
                <p className="text-xs text-gray-500">
                  Reviewed: {moment(review.reviewTime).format("DD/MM/YY")}
                </p>
                <p className="mt-2 text-sm">{review.reviewDescription}</p>
              </div>

              <div className="mt-3">
                <Button
                  size="sm"
                  color="red"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
