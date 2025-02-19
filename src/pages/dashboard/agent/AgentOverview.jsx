import { Card, Typography } from "@material-tailwind/react";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line } from "recharts";
import { FaHome, FaDollarSign, FaRegClock, FaChartBar } from "react-icons/fa";

const AgentOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myProperties = [] } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/properties/${user?.email}`);
      return data;
    },
  });

  // Fetch offered properties
  const { data: offered = [] } = useQuery({
    queryKey: ["offered"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offered/${user?.email}`);
      return data;
    },
  });

  const { data: soldProperties = [] } = useQuery({
    queryKey: ["sold-properties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/sold-properties/${user?.email}`);
      return data;
    },
  });

  //   stats
  // Total sold amount is already calculated
  const totalSoldAmount = soldProperties.reduce(
    (sum, property) => sum + (property.offeredPrice || 0),
    0
  );

  const totalProperties = myProperties.length;
  const totalOfferedProperties = offered.length;
  const totalSoldProperties = soldProperties.length;

  // prepare data for charts
  const statusData = myProperties.reduce((acc, property) => {
    acc[property.status] = (acc[property.status] || 0) + 1;
    return acc;
  }, {});

  const statusChartData = Object.keys(statusData).map((key) => ({
    name: key,
    count: statusData[key],
  }));

  const soldDates = soldProperties.map((property) =>
    new Date(property.buyingDate).toLocaleDateString()
  );
  const soldAmounts = soldProperties.map((property) => property.offeredPrice);

  const soldAmountChartData = soldDates.map((date, index) => ({
    date,
    amount: soldAmounts[index],
  }));

  const offeredPriceData = offered.map((property) => property.offeredPrice);

  const offeredPriceChartData = offeredPriceData.map((price, index) => ({
    offer: `Offer ${index + 1}`,
    price,
  }));

  return (
    <div>
      {/* header and time */}
      <div className="flex justify-between items-center">
        <DashboardHeader
          title={`Hello, ${user?.displayName}`}
          description={"Here's what's happening today."}
        />

        <div className="hidden sm:block">
          <Typography variant="small">
            {new Date().toLocaleDateString("en-GB")}
          </Typography>
          <Typography variant="small">
            {new Date().toLocaleTimeString()}
          </Typography>
        </div>
      </div>

      <div className="h-[70vh] p-4 overflow-scroll">
        {/* stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card
            className={`p-2 flex items-center border border-black/20 bg-gray-100 rounded-lg hover:shadow-xl hover:bg-gray-200 duration-500`}
          >
            <div className="p-2 bg-white rounded-full">
              <FaHome />
            </div>
            <div className="text-center">
              <Typography variant="h5">{totalProperties}</Typography>
              <p className="text-gray-600 text-sm">Total Properties</p>
            </div>
          </Card>

          <Card
            className={`p-2 flex items-center border border-black/20 bg-gray-100 rounded-lg hover:shadow-xl hover:bg-gray-200 duration-500`}
          >
            <div className="p-2 bg-white rounded-full">
              <FaChartBar />
            </div>
            <div className="text-center">
              <Typography variant="h5">{totalOfferedProperties}</Typography>
              <p className="text-gray-600 text-sm">Total Offered Properties</p>
            </div>
          </Card>

          <Card
            className={`p-2 flex items-center border border-black/20 bg-gray-100 rounded-lg hover:shadow-xl hover:bg-gray-200 duration-500`}
          >
            <div className="p-2 bg-white rounded-full">
              <FaDollarSign />
            </div>
            <div className="text-center">
              <Typography variant="h5">{totalSoldProperties}</Typography>
              <p className="text-gray-600 text-sm">Total Sold Properties</p>
            </div>
          </Card>

          <Card
            className={`p-2 flex items-center border border-black/20 bg-gray-100 rounded-lg hover:shadow-xl hover:bg-gray-200 duration-500`}
          >
            <div className="p-2 bg-white rounded-full">
              <FaRegClock />
            </div>
            <div className="text-center">
              <Typography variant="h5">{totalSoldAmount}</Typography>
              <p className="text-gray-600 text-sm">Total Sold Amount</p>
            </div>
          </Card>
        </div>

        {/* charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 my-4">
          <Card className="border p-4 flex flex-col items-center">
            <h6 className="text-lg font-semibold mb-4">
              Sold Amount Over Time
            </h6>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={soldAmountChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border p-4 flex flex-col items-center">
            <h6 className="text-lg font-semibold mb-4">
              Property Distribution by Status
            </h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border p-4 flex flex-col items-center col-span-2">
            <h6 className="text-lg font-semibold mb-4">
              Offered Price Distribution
            </h6>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={offeredPriceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="offer" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentOverview;
