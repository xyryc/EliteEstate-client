import DashboardHeader from "../../../components/Shared/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Card, CardBody, Typography } from "@material-tailwind/react";
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
} from "recharts";

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
    <div>
      {/* header and time */}
      <div className="flex justify-between items-center gap-4">
        <DashboardHeader
          title={`Hello, ${user?.displayName}`}
          description={"Here's what's happening today."}
        />

        <div>
          <Typography variant="small">
            {new Date().toLocaleDateString("en-GB")}
          </Typography>
          <Typography variant="small">
            {new Date().toLocaleTimeString()}
          </Typography>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center shadow-md">
          <CardBody>
            <Typography variant="h6">Total Offers</Typography>
            <Typography variant="h4" className="font-bold">
              {totalOffers}
            </Typography>
          </CardBody>
        </Card>
        <Card className="p-4 text-center shadow-md">
          <CardBody>
            <Typography variant="h6">Accepted</Typography>
            <Typography variant="h4" className="text-green-500 font-bold">
              {acceptedOffers}
            </Typography>
          </CardBody>
        </Card>
        <Card className="p-4 text-center shadow-md">
          <CardBody>
            <Typography variant="h6">Rejected</Typography>
            <Typography variant="h4" className="text-red-500 font-bold">
              {rejectedOffers}
            </Typography>
          </CardBody>
        </Card>
        <Card className="p-4 text-center shadow-md">
          <CardBody>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4" className="text-yellow-500 font-bold">
              {pendingOffers}
            </Typography>
          </CardBody>
        </Card>
        <Card className="p-4 text-center shadow-md">
          <CardBody>
            <Typography variant="h6">Total Offered Amount</Typography>
            <Typography variant="h4" className="font-bold">
              ${totalOfferedAmount}
            </Typography>
          </CardBody>
        </Card>
        <Card className="p-4 text-center shadow-md">
          <CardBody>
            <Typography variant="h6">Average Offer Price</Typography>
            <Typography variant="h4" className="font-bold">
              ${averageOfferPrice}
            </Typography>
          </CardBody>
        </Card>
      </div>

      {/* Offer Status Pie Chart */}
      <Card className="p-4 shadow-md mt-6">
        <Typography variant="h6" className="mb-4">
          Offer Status Distribution
        </Typography>
        <PieChart width={400} height={300}>
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
        </PieChart>
      </Card>

      {/* Offer Price Trends Line Chart */}
      <Card className="p-4 shadow-md mt-6">
        <Typography variant="h6" className="mb-4">
          Offer Price Trends
        </Typography>
        <LineChart width={600} height={300} data={priceTrendsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      </Card>

      {/* Most Popular Locations Bar Chart */}
      <Card className="p-4 shadow-md mt-6">
        <Typography variant="h6" className="mb-4">
          Most Popular Locations
        </Typography>
        <BarChart width={600} height={300} data={locationData}>
          <XAxis dataKey="location" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </Card>

      {/* Agent Performance Bar Chart */}
      <Card className="p-4 shadow-md mt-6">
        <Typography variant="h6" className="mb-4">
          Agent Performance
        </Typography>
        <BarChart width={600} height={300} data={agentData}>
          <XAxis dataKey="agent" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ffb74d" />
        </BarChart>
      </Card>
    </div>
  );
};

export default CusotmerOverview;
