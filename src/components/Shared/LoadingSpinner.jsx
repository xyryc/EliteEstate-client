import { Spinner } from "@material-tailwind/react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-305px)]">
      <Spinner className="h-16 w-16 text-gray-900/50" />
    </div>
  );
};

export default LoadingSpinner;
