import DashboardHeader from "../../../components/Shared/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card, Typography } from "@material-tailwind/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaDollarSign,
  FaCalculator,
} from "react-icons/fa";

const CusotmerOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const COLORS = ["#4CAF50", "#FF5252", "#FFC107"];

  // Fetch user offered properties
  const { data: offered = [] } = useQuery({
    queryKey: ["offered"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/offer/${user?.email}`);
      return data;
    },
  });

  console.log(offered);

  // Calculate summary stats
  const totalOffers = offered.length;
  const acceptedOffers = offered.filter(
    (offer) => offer.offerStatus === "accepted"
  ).length;
  const rejectedOffers = offered.filter(
    (offer) => offer.offerStatus === "rejected"
  ).length;
  const pendingOffers = offered.filter(
    (offer) => offer.offerStatus === "pending"
  ).length;
  const totalOfferedAmount = offered.reduce(
    (sum, offer) => sum + offer.offeredPrice,
    0
  );
  const averageOfferPrice =
    totalOffers > 0 ? (totalOfferedAmount / totalOffers).toFixed(2) : 0;

  const stats = [
    {
      label: "Total Offers",
      value: totalOffers,
      icon: <FaChartBar className="text-red-500 text-2xl" />,
    },
    {
      label: "Accepted",
      value: acceptedOffers,
      icon: <FaCheckCircle className="text-green-500 text-2xl" />,
    },
    {
      label: "Rejected",
      value: rejectedOffers,
      icon: <FaTimesCircle className="text-red-500 text-2xl" />,
    },
    {
      label: "Pending",
      value: pendingOffers,
      icon: <FaHourglassHalf className="text-yellow-500 text-2xl" />,
    },
    {
      label: "Total Offered Amount",
      value: `$${totalOfferedAmount}`,
      icon: <FaDollarSign className="text-blue-500 text-2xl" />,
    },
    {
      label: "Average Offer Price",
      value: `$${averageOfferPrice}`,
      icon: <FaCalculator className="text-purple-500 text-2xl" />,
    },
  ];

  // Offer Status Distribution (Pie Chart)
  const offerStatusData = [
    { name: "Accepted", value: acceptedOffers },
    { name: "Rejected", value: rejectedOffers },
    { name: "Pending", value: pendingOffers },
  ];

  // Offer Price Trends Over Time (Line Chart)
  const priceTrendsData = offered.map((offer) => ({
    date: new Date(offer.buyingDate).toLocaleDateString("en-GB"),
    price: offer.offeredPrice,
  }));

  // Most Popular Locations (Bar Chart)
  const locationCount = {};
  offered.forEach((offer) => {
    locationCount[offer.propertyLocation] =
      (locationCount[offer.propertyLocation] || 0) + 1;
  });

  const locationData = Object.entries(locationCount).map(
    ([location, count]) => ({ location, count })
  );

  // Agent Performance (Bar Chart)
  const agentCount = {};
  offered.forEach((offer) => {
    agentCount[offer.agent.name] = (agentCount[offer.agent.name] || 0) + 1;
  });
  
  const agentData = Object.entries(agentCount).map(([agent, count]) => ({
    agent,
    count,
  }));

  return (
    <div className="md:h-[90vh] overflow-scroll px-4">
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

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`p-2 flex items-center border border-black/20 bg-gray-100 rounded-lg hover:shadow-xl hover:bg-gray-200 duration-500`}
          >
            <div className="p-2 bg-white rounded-full">{stat.icon}</div>
            <div className="text-center">
              <Typography variant="h5">{stat.value}</Typography>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-4">
        {/* Offer Status Pie Chart */}
        <Card className="border p-4 flex flex-col items-center">
          <h6 className="text-lg font-semibold mb-4">
            Offer Status Distribution
          </h6>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={offerStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {offerStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Offer Price Trends Line Chart */}
        <Card className="border p-4 flex flex-col items-center">
          <h6 className="text-lg font-semibold mb-4">Offer Price Trends</h6>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Most Popular Locations Bar Chart */}
        <Card className="border p-4 flex flex-col items-center">
          <h6 className="text-lg font-semibold mb-4">Most Popular Locations</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Agent Performance Bar Chart */}
        <Card className="border p-4 flex flex-col items-center">
          <h6 className="text-lg font-semibold mb-4">Most Frequented Agents</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentData}>
              <XAxis dataKey="agent" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffb74d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default CusotmerOverview;
