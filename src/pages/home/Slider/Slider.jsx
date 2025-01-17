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
        delay: 2500,
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
          "background-image":
            "url(https://i.ibb.co.com/x1gxs02/analog-landscape-city-with-buildings.jpg)",
        }}
        data-swiper-parallax="-23%"
      ></div>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Discover Your Dream Home
        </div>
    
        <div className="text" data-swiper-parallax="-100">
          <p>
            Find the perfect property in your desired location with options that
            cater to every lifestyle, budget, and future aspirations.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Luxury Living Awaits
        </div>
      
        <div className="text" data-swiper-parallax="-100">
          <p>
            Step into a world of elegance with premium properties offering
            state-of-the-art amenities and unparalleled comfort.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="title" data-swiper-parallax="-300">
          Invest in Your Future
        </div>
     
        <div className="text" data-swiper-parallax="-100">
          <p>
            Unlock incredible real estate opportunities and build lasting value
            with properties you can trust and depend on.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
