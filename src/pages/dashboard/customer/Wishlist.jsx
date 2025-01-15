import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: wishlistData = [] } = useQuery({
    queryKey: ["wishlistData"],
    queryFn: async () => {
      // fetch a specific wishlisted property data

      const { data } = await axiosSecure.get(`/wishlist/${user?.email}`);
      return data;
    },
  });

  //   const { agent, image, title, location, max_price, min_price, status } =
  //     wishlist;

  console.log(wishlistData);

  return <div>Coming Soon</div>;
};

export default Wishlist;
