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
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const COLORS = ["#22c55e", "#ef4444"];

const HRAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: assetTypes = [], isLoading: loading1 } = useQuery({
    queryKey: ["assetTypes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/asset-types");
      return res.data;
    },
  });

  const { data: topAssets = [], isLoading: loading2 } = useQuery({
    queryKey: ["topAssets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-assets");
      return res.data;
    },
  });

  if (loading1 || loading2) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* PIE CHART */}
      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold text-center mb-4">
          Returnable vs Non-returnable Assets
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={assetTypes}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {assetTypes.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="card bg-base-100 shadow-xl p-4">
        <h2 className="text-lg font-semibold text-center mb-4">
          Top 5 Most Requested Assets
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topAssets}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="requests" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HRAnalytics;
