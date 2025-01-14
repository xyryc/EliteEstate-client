import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  const {
    data: singleProp = [],
    // refetch,
  } = useQuery({
    queryKey: ["singleProp"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/properties/${id}`);
      return data;
    },
  });
  console.log(singleProp);

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
    const image_url = await imageUpload(image);

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
    };

    console.table(propertyData);

    // save data in db
    try {
      const { data } = await axiosSecure.post(`/properties`, propertyData);
      console.log(data);
      toast.success("Data added successfully!");
      navigate("/dashboard/addedProperties");
    } catch (err) {
      console.log(err);
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
              defaultValue={singleProp.title}
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
              defaultValue={singleProp.location}
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
                defaultValue={singleProp.min_price}
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
                defaultValue={singleProp.max_price}
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
            Update Property
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdateProperty;
