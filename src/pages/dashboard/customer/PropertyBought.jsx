import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { CgSearchLoading } from "react-icons/cg";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user offered properties
  const { data: offered = [] } = useQuery({
    queryKey: ["property"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offer/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <Typography variant="h3" className="font-extrabold text-center mb-8">
        Properties You Have Offered
      </Typography>
      {offered.length === 0 ? (
        <Typography color="gray" className="text-center text-lg">
          You have not offered on any properties yet.
        </Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offered.map((property) => (
            <Card
              key={property._id}
              shadow={true}
              className="rounded-lg border border-gray-200 hover:shadow-xl transition-all ease-in-out duration-300"
            >
              {/* Image Section */}
              <div className="w-full h-40 bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={property.propertyImage}
                  alt={property.propertyTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body Section */}
              <CardBody className="space-y-4 py-6 px-4">
                <Typography className="font-bold capitalize" variant="h5">
                  {property.propertyTitle}
                </Typography>

                <div className="flex items-center text-sm text-gray-600">
                  <MdLocationOn className="text-blue-500 mr-2" />
                  <Typography className="font-medium">
                    {property.propertyLocation}
                  </Typography>
                </div>
                <div className="flex items-center text-sm text-gray-600 capitalize">
                  <FaUserAlt className="text-yellow-500 mr-2" />
                  <Typography>Agent: {property.agent.name}</Typography>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MdAttachMoney className="text-green-500 mr-2" />
                  <Typography>
                    Offered Amount:{" "}
                    <span className="font-semibold text-blue-600">
                      ${property.offeredPrice.minOffered} - $
                      {property.offeredPrice.maxOffered}
                    </span>
                  </Typography>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CgSearchLoading className="text-purple-500 mr-2" />
                  <Typography
                    variant="small"
                    className="font-medium capitalize"
                  >
                    Status: {property.offerStatus}
                  </Typography>
                </div>
              </CardBody>

              {/* Pay Button (if offer is accepted) */}
              {property.offerStatus === "accepted" && (
                <CardFooter className="flex justify-center p-4">
                  <Button
                    color="green"
                    size="lg"
                    fullWidth
                    className="transition-transform transform hover:scale-105 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-600"
                  >
                    Pay Now
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
