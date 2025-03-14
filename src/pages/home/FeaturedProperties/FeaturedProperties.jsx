import axios from "axios";
import Header from "../../../components/Shared/Header";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";
import CardPublic from "../../../components/Shared/CardPublic";
import { useRef } from "react";
import "./FeaturedProperties.css";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const FeaturedProperties = () => {
  const { data: advertise = [] } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      // fetch all verified properties
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/advertise`
      );
      return data;
    },
  });

  const scrollContainer = useRef(null);

  const scrollNext = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="pb-20">
      <Header
        title={"Featured Properties"}
        description={
          "Explore Our Top Picks in Real Estate for the Best Homes and Investments."
        }
      />

      <div className="relative p-4">
        {/* Scrollable container */}
        <div
          ref={scrollContainer}
          className="grid grid-flow-col gap-6 overflow-x-auto scroll-smooth no-scrollbar"
          style={{ gridAutoColumns: "minmax(300px, 1fr)" }}
        >
          {advertise?.map((item) => (
            <CardPublic key={item._id} item={item} />
          ))}
        </div>

        {/* Navigation buttons in the top-right */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button size="sm" onClick={scrollPrev} className="flex items-center gap-2">
            <LuArrowLeft /> Prev
          </Button>
          <Button size="sm" onClick={scrollNext} className="flex items-center gap-2">
            Next
            <LuArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
