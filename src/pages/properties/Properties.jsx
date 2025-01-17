import { useQuery } from "@tanstack/react-query";
import { IoLocationOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Header from "../../components/Shared/Header";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const Properties = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  const { data: verifiedProperties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties", search, minPrice, maxPrice, sort],
    queryFn: async () => {
      // fetch verified properties
      const { data } = await axiosSecure.get(
        `${
          import.meta.env.VITE_API_URL
        }/verifiedProperties?search=${search}&min=${minPrice}&max=${maxPrice}&sort=${sort}`
      );
      return data;
    },
  });

  const handleReset = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
  };

  console.log(minPrice, maxPrice);

  return (
    <div>
      <Header
        title={"All Properties"}
        description={"Browse through all our best and verified properties"}
      />

      {/* search, sort, filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-6">
        {/* price range filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2 ">
          <input
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
            type="text"
            placeholder="Min Price"
            className="px-4 p-2 outline-1 outline rounded-lg w-36"
          />

          <input
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
            type="text"
            placeholder="Max Price"
            className="px-4 p-2 outline-1 outline rounded-lg w-36"
          />
        </div>

        {/* search */}
        <div className="flex p-1 overflow-hidden rounded-lg outline-1 outline">
          <input
            className="px-4 py-1 outline-none"
            type="text"
            name="search"
            placeholder="Search by Location"
            aria-label="Search by Location"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <Button size="sm">Search</Button>
        </div>

        {/* price based sorting */}
        <div>
          <select
            name="category"
            id="category"
            className="p-2 rounded-md outline-1 outline"
            onChange={(e) => {
              setSort(e.target.value);
            }}
            value={sort}
          >
            <option value="" disabled>
              Sort By Price
            </option>
            <option value="dsc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <Button size="sm" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : !verifiedProperties?.length ? (
        <p>
          <img
            src="https://i.ibb.co.com/8zMhZ9d/no-result.png"
            className="mx-auto"
            alt="no result"
          />
          <p className="text-3xl font-bold text-center py-10">
            No result found!
          </p>
        </p>
      ) : (
        <div className="container mx-auto px-4 border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {verifiedProperties?.map((item) => (
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
    </div>
  );
};

export default Properties;
