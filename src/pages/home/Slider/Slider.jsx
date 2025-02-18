import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slider.css";

// import required modules
import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        style={{
          backgroundImage: "url(/sliderImg.webp)",
        }}
        data-swiper-parallax="-23%"
      ></div>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Find Your Dream Home
        </div>

        <div className="text font-inter" data-swiper-parallax="-100">
          <p>
            Find the perfect property in your desired location with options
            catering to every lifestyle, budget, and aspirations.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Luxury Living Awaits
        </div>

        <div className="text" data-swiper-parallax="-100">
          <p>
            Step into elegance with premium properties offering modern amenities
            and comfort.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Invest in Your Future
        </div>

        <div className="text" data-swiper-parallax="-100">
          <p>
            Unlock real estate opportunities and build lasting value with
            trusted properties.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
