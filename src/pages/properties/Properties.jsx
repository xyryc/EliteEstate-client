import { useQuery } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Properties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: verifiedProperties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      // fetch verified properties
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/verifiedProperties`
      );
      return data;
    },
  });

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-4 border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {verifiedProperties.map((item) => (
            <Link
              to={`/properties/details/${item._id}`}
              key={item._id}
              className="border border-gray-400 rounded-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-t-xl h-52 object-cover w-full"
              />

              <div className="p-4">
                <h3 className="font-semibold text-xl">{item.title}</h3>

                <div className="flex items-center gap-4">
                  <p className="opacity-70 text-lg font-semibold my-1">
                    ${item.min_price} - ${item.max_price}
                  </p>
                  <p className="bg-light-green-200 text-light-green-800  font-bold text-xs px-3 py-1 rounded-full">
                    {item.status}
                  </p>
                </div>

                <p className="flex items-center gap-1 text-sm opacity-70">
                  <IoLocationOutline />
                  {item.location}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.agent.image}
                      alt={item.agent.name}
                      className="h-10  w-10 rounded-full object-cover"
                    />

                    <p className="text-lg font-bold opacity-70">
                      {item.agent.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-2xl opacity-70">
                    <LuHeart />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Properties;
