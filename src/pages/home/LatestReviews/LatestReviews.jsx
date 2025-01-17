import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const LatestReviews = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const { data } = await axios.get("/latestReviews");
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Failed to load reviews.</p>;

  return (
    <div className="latest-reviews">
      <h2 className="text-2xl font-bold mb-4">Latest User Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="review-card border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
            </div>
            <h4 className="text-md font-bold mb-2">{review.propertyTitle}</h4>
            <p className="text-gray-600 text-sm">{review.reviewDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
