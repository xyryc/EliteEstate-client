import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: singleProp = [] } = useQuery({
    queryKey: ["singleProp"],
    queryFn: async () => {
      // fetch a specific verified property data
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/verifiedProperties/${id}`
      );
      return data;
    },
  });

  console.log(singleProp);

  return <div>details</div>;
};

export default Details;
