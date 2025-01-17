import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Header from "../../components/Shared/Header";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import Card from "../../components/Shared/Card";

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
    <div className="container mx-auto px-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {verifiedProperties?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;
