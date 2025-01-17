import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Header from "../../../components/Shared/Header";

const LatestReviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews/latest`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="latest-reviews">
      <Header
        title={"Latest Reviews"}
        description={
          "Hear What Our Customers Have to Say About Their Experiences."
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="review-card border p-4 rounded-lg shadow-sm"
          >
            <div className="flex flex-col items-center justify-center">
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
