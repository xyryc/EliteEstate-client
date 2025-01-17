import { Footer } from "../components/Shared/Footer";
// import LatestReviews from "../pages/home/LatestReviews/LatestReviews";

import Slider from "../pages/home/Slider/Slider";

const HomeLayout = () => {
  return (
    <div>
      <Slider />

      <p>Advertiesement</p>

      {/* <LatestReviews /> */}

      <Footer />
    </div>
  );
};

export default HomeLayout;
