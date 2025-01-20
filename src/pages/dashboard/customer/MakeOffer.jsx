import { Button, Card, Input, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import useRole from "../../../hooks/useRole";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [role] = useRole();

  const { data: property = {} } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlist/property/${id}`);
      return data;
    },
  });

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const offeredPrice = form.offered_price.value;
    const buyer = { email: user?.email, name: user?.displayName };

    const offerData = {
      propertyId: property.propertyId,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyImage: property.image,
      agent: property.agent,
      buyer,
      buyingDate: Date.now(),
      offeredPrice: parseFloat(offeredPrice),
      offerStatus: "pending",
    };

    if (
      offeredPrice < property.min_price ||
      offeredPrice > property.max_price
    ) {
      setLoading(false);
      toast.error("Please offer an amount within range!");
    } else {
      // save data in db
      try {
        const { data } = await axiosSecure.post(`/offer`, offerData);
        console.log(data);
        toast.success("Offered successfully!");
        navigate("/dashboard/propertyBought");
      } catch (err) {
        console.log(err);
        toast.error("Failed to offer, Try again!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <Card
        color="transparent"
        shadow={false}
        className="max-w-lg rounded-lg bg-white shadow-none"
      >
        <Typography variant="h4" color="blue-gray">
          Offer A Price
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your offered price here.
        </Typography>
        <form
          className="mt-8 mb-2 max-w-screen-lg space-y-3"
          onSubmit={handleOfferSubmit}
        >
          {/* title */}
          <div>
            <Typography variant="h6" color="blue-gray">
              Property Title
            </Typography>
            <Input
              defaultValue={property?.title}
              name="title"
              size="lg"
              placeholder="Enter property title"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              readOnly
              disabled
            />
          </div>

          {/* location */}
          <div>
            <Typography variant="h6" color="blue-gray">
              Property Location
            </Typography>
            <Input
              defaultValue={property?.location}
              name="location"
              size="lg"
              placeholder="Enter property location"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              readOnly
              disabled
            />
          </div>

          {/* price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Typography variant="h6" color="blue-gray">
                Minimum Price
              </Typography>
              <Input
                defaultValue={property?.min_price}
                name="min_price"
                size="lg"
                placeholder="Minimum Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                readOnly
                disabled
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Maximum Price
              </Typography>
              <Input
                defaultValue={property?.max_price}
                name="max_price"
                size="lg"
                placeholder="Maximum Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                readOnly
                disabled
              />
            </div>
          </div>

          {/* offered price */}
          <div>
            <Typography variant="h6" color="blue-gray">
              Offer a price
            </Typography>
            <Input
              name="offered_price"
              size="lg"
              placeholder="Minimum Price"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* agent info */}
          <div className="flex items-center gap-2">
            <Typography variant="h6" color="blue-gray">
              Agent Name & Email:
            </Typography>
            <Typography variant="paragraph">
              {property?.agent?.name} ({property?.agent?.email})
            </Typography>
          </div>

          {/* agent info */}
          <div className="flex items-center gap-2">
            <Typography variant="h6" color="blue-gray">
              Buyer Name & Email:
            </Typography>
            <Typography variant="paragraph">
              {user?.displayName} ({user?.email})
            </Typography>
          </div>

          {/* buying time */}
          <div className="flex items-center gap-2">
            <Typography variant="h6" color="blue-gray">
              Buying Date:
            </Typography>
            <Typography variant="paragraph">
              {moment().format("MMMM Do YYYY")}
            </Typography>
          </div>

          <Button
            className="mt-6"
            type="submit"
            loading={loading && true}
            disabled={role === "agent" || role === "admin"}
          >
            Offer
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default MakeOffer;
