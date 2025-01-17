import axios from "axios";
import Header from "../../../components/Shared/Header";
import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/Shared/Card";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <Header
        title={"Featured Properties"}
        description={"Explore Our Top Picks in Real Estate."}
      />

      <div className="flex flex-wrap justify-center gap-6">
        {advertise?.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>

      <Link to="/properties">
        <Button variant="gradient" className="mt-6 block mx-auto">
          Sell All
        </Button>
      </Link>
    </div>
  );
};

export default FeaturedProperties;
