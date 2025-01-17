import { Footer } from "../components/Shared/Footer";
import Slider from "../pages/home/Slider/Slider";

const HomeLayout = () => {
  return (
    <div>
      <Slider />
      <p>Card</p>
      <p>FAQ</p>

      <Footer />
    </div>
  );
};

export default HomeLayout;
