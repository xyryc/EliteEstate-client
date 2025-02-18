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
            className="review-card border p-4 rounded-lg shadow-sm border-gray-300 bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="h-16 w-16 rounded-full object-cover"
              />
              <h3 className="font-semibold mt-2">{review.reviewerName}</h3>
            </div>
            <h4 className="text-md font-bold mb-2">{review.propertyTitle}</h4>
            <p className="text-gray-800">
            &quot;{review.reviewDescription.slice(0, 240)}...&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
