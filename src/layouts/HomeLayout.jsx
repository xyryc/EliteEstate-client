import FeaturedProperties from "../pages/home/FeaturedProperties/FeaturedProperties";
import LatestReviews from "../pages/home/LatestReviews/LatestReviews";
import Slider from "../pages/home/Slider/Slider";

const HomeLayout = () => {
  return (
    <div>
      <Slider />

      <div className="container mx-auto px-4 space-y-20 my-20">
        <FeaturedProperties />

        <LatestReviews />
      </div>
    </div>
  );
};

export default HomeLayout;
