import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import { toast } from "react-hot-toast";

export default function AddProperty() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);

  // handle format submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const min_price = parseFloat(form.min_price.value);
    const max_price = parseFloat(form.max_price.value);
    const image = form.image.files[0];

    let image_url;

    if (image) {
      // Upload the image if provided
      image_url = await imageUpload(image);
    } else {
      // Handle the case where no image is selected
      image_url = "https://i.ibb.co.com/BnpMZ64/g1-4.webp"; // Replace with a valid default image URL if necessary
      toast("No image selected. Using a default image.");
    }

    // agent info
    const agent = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // create plant data object
    const propertyData = {
      title,
      location,
      min_price,
      max_price,
      image: image_url,
      agent,
      status: "Pending",
    };

    // console.table(propertyData);

    // save data in db
    try {
      const { data } = await axiosSecure.post(
        `/properties/${user?.email}`,
        propertyData
      );
      console.log(data);
      toast.success("Data added successfully!");
      navigate("/dashboard/addedProperties");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add data!");
    } finally {
      setLoading(false);
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
          Add Property
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 max-w-screen-lg space-y-3"
          onSubmit={handleSubmit}
        >
          {/* title */}
          <div>
            <Typography variant="h6" color="blue-gray">
              Property Title
            </Typography>
            <Input
              name="title"
              size="lg"
              placeholder="Enter property title"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* location */}
          <div>
            <Typography variant="h6" color="blue-gray">
              Property Location
            </Typography>
            <Input
              name="location"
              size="lg"
              placeholder="Enter property location"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Typography variant="h6" color="blue-gray">
                Minimum Price
              </Typography>
              <Input
                name="min_price"
                size="lg"
                placeholder="Minimum Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div>
              <Typography variant="h6" color="blue-gray">
                Maximum Price
              </Typography>
              <Input
                name="max_price"
                size="lg"
                placeholder="Maximum Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>

          {/* Image Input */}
          <div>
            <Typography variant="h6" color="blue-gray">
              Property Image
            </Typography>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full border rounded-md p-2"
            />
          </div>

          <Typography variant="paragraph" color="blue-gray">
            Agent Name & Email: {user?.displayName} ({user?.email})
          </Typography>

          <Button className="mt-6" type="submit" loading={loading && true}>
            Add Property
          </Button>
        </form>
      </Card>
    </div>
  );
}
