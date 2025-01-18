/* eslint-disable react/prop-types */
import { Typography } from "@material-tailwind/react";

const DashboardHeader = ({ title, description }) => {
  return (
    <div className="sm:p-6">
      <Typography variant="lead" color="blue-gray" className="font-bold capitalize">
        {title}
      </Typography>
      <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
        {description}
      </Typography>
    </div>
  );
};

export default DashboardHeader;
