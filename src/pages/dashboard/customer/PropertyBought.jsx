import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { CgSearchLoading } from "react-icons/cg";
import { Link } from "react-router-dom";
import { LuCreditCard } from "react-icons/lu";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EmptyPage from "../../../components/Shared/EmptyPage";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user offered properties
  const { data: offered = [], isLoading } = useQuery({
    queryKey: ["property"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offer/${user?.email}`);
      return data;
    },
  });

  return (
    <div>
      <DashboardHeader
        title={"My Bought Properties & Transactions"}
        description={
          "Review the properties you've acquired or bid on with ease"
        }
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : offered.length === 0 ? (
        <>
          <EmptyPage message={"Nothing bought yet"} />
          <Link to="/properties">
            <Button className="block mx-auto">Go To Properties</Button>
          </Link>
        </>
      ) : (
        <div className="h-[70vh] overflow-y-scroll px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6">
            {offered.map((property) => (
              <Card
                key={property._id}
                shadow={true}
                className="rounded-xl border border-gray-400 hover:shadow-xl transition-all ease-in-out duration-300"
              >
                {/* Image Section */}
                <div className="w-full h-40 bg-gray-100 rounded-t-xl overflow-hidden">
                  <img
                    src={property.propertyImage}
                    alt={property.propertyTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Body Section */}
                <CardBody className="p-4">
                  <Typography
                    className="font-bold capitalize text-black"
                    variant="h5"
                  >
                    {property.propertyTitle}
                  </Typography>

                  <div className="flex items-center text-sm text-gray-600">
                    <MdLocationOn className="mr-2" />
                    <Typography className="font-medium">
                      {property.propertyLocation}
                    </Typography>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 capitalize">
                    <FaUserAlt className="mr-2" />
                    <Typography>Agent: {property.agent.name}</Typography>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MdAttachMoney className="mr-2" />
                    <Typography>
                      Offered:{" "}
                      <span className="font-semibold">
                        ${property.offeredPrice}
                      </span>
                    </Typography>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CgSearchLoading className="mr-2" />
                    <Typography className={`font-medium capitalize`}>
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          (property.offerStatus === "bought" &&
                            "text-green-500") ||
                          (property.offerStatus === "pending" &&
                            "text-amber-500") ||
                          (property.offerStatus === "accepted" &&
                            "text-blue-500") ||
                          (property.offerStatus === "rejected" &&
                            "text-red-500")
                        }`}
                      >
                        {property.offerStatus}
                      </span>
                    </Typography>
                  </div>

                  {property?.paymentInfo?.transactionId && (
                    <div className="flex items-center text-sm text-gray-600">
                      <LuCreditCard className="mr-2" />
                      <Typography className="font-medium capitalize">
                        Txn Id:{" "}
                        <span className="text-sm text-green-500">{property?.paymentInfo?.transactionId}</span>
                      </Typography>
                    </div>
                  )}

                  <div className="mt-2">
                    {/* Pay Button (if offer is accepted) */}
                    {property.offerStatus === "accepted" && (
                      <Link
                        to={`/dashboard/propertyBought/pay/${property._id}`}
                      >
                        <Button size="sm">Pay Now</Button>
                      </Link>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyBought;
