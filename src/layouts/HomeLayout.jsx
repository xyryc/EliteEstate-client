import { CustomAccordion } from "../pages/home/Accordion/CustomAccordion";
import FeaturedProperties from "../pages/home/FeaturedProperties/FeaturedProperties";
import LatestReviews from "../pages/home/LatestReviews/LatestReviews";
import Slider from "../pages/home/Slider/Slider";
import Partners from "../pages/home/Partners/Partners";
import Stats from "../pages/home/Stats/Stats";

const HomeLayout = () => {
  return (
    <div>
      <Slider />

      <div className="container mx-auto px-4 space-y-20 my-20">
        <Stats />

        <FeaturedProperties />

        <LatestReviews />
      </div>

      <Partners />

      <div className="container mx-auto px-4 space-y-20 my-20">
        <CustomAccordion />
      </div>
    </div>
  );
};

export default HomeLayout;
