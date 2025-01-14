import { Card, Input, Button, Typography } from "@material-tailwind/react";
import useAuth from "../../../hooks/useAuth";

export default function AddProperty() {
  const { user } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
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
          <div>
            <Typography variant="h6" color="blue-gray">
              Property Title
            </Typography>
            <Input
              size="lg"
              placeholder="Enter property title"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div>
            <Typography variant="h6" color="blue-gray">
              Property Location
            </Typography>
            <Input
              size="lg"
              placeholder="Enter property location"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <Typography variant="h6" color="blue-gray">
                Minimum Price
              </Typography>
              <Input
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

          <Button className="mt-6" fullWidth>
            Add Property
          </Button>
        </form>
      </Card>
    </div>
  );
}
