import { Card, CardBody, Typography } from "@material-tailwind/react";
import DashboardHeader from "../../../components/Shared/DashboardHeader";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: properties = [] } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-properties`);
      return data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user?.email}`);
      return data;
    },
  });

  // stats
  const userCounts = users.reduce((acc, curr) => {
    acc[curr.role] = (acc[curr.role] || 0) + 1;
    return acc;
  }, {});

  // Property statistics
  const propertyCounts = properties.reduce(
    (acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    },
    { Verified: 0, Pending: 0 }
  );

  const avgPropertyPrice = properties.length
    ? properties.reduce(
        (sum, property) => sum + (property.min_price + property.max_price) / 2,
        0
      ) / properties.length
    : 0;

  const advertisedProperties = properties.filter(
    (property) => property.advertise
  ).length;

  //   chart data
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const userChartData = Object.keys(roleCounts).map((role) => ({
    name: role,
    value: roleCounts[role],
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Process property data for BarChart
  const propertyStatusCounts = properties.reduce((acc, property) => {
    acc[property.status] = (acc[property.status] || 0) + 1;
    return acc;
  }, {});

  const propertyChartData = Object.keys(propertyStatusCounts).map((status) => ({
    name: status,
    value: propertyStatusCounts[status],
  }));

  return (
    <div className="md:h-[90vh] overflow-scroll px-4">
      {/* Header and Time */}
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

      {/* Charts and stats */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* User Role Pie Chart */}
        <div className="p-4">
          <Card className="border p-4 flex flex-col items-center">
            <h6 className="text-lg font-semibold mb-4">User Roles</h6>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {userChartData.map((entry, index) => (
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
        </div>

        {/* Property Status Bar Chart */}
        <div className="p-4">
          <Card className="border p-4 flex flex-col items-center">
            <h6 className="text-lg font-semibold mb-4">Property Status</h6>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={propertyChartData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <Card className="border border-black/30">
          <CardBody>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="small">
              Admin: {userCounts.admin || 0}
            </Typography>
            <Typography variant="small">
              Agents: {userCounts.agent || 0}
            </Typography>
            <Typography variant="small">
              Users: {userCounts.customer || 0}
            </Typography>
          </CardBody>
        </Card>

        <Card className="border border-black/30">
          <CardBody>
            <Typography variant="h6">Total Properties</Typography>
            <Typography variant="small">
              Verified: {propertyCounts.Verified}
            </Typography>
            <Typography variant="small">
              Pending: {propertyCounts.Pending}
            </Typography>
            <Typography variant="small">
              Advertised: {advertisedProperties}
            </Typography>
            <Typography variant="small">
              Avg Price: ${avgPropertyPrice.toFixed(2)}
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
