import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const MyTeam = () => {
  const { user } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/employees/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const companies = [...new Set(employees.map((emp) => emp.companyName))];

  const filteredEmployees = selectedCompany
    ? employees.filter((emp) => emp.companyName === selectedCompany)
    : employees;

  const now = new Date().getMonth();
  const birthdays = employees.filter(
    (emp) => emp.dateOfBirth && new Date(emp.dateOfBirth).getMonth() === now
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading team data.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Team</h2>

      {/* Company Filter */}
      <div className="mb-6 text-center">
        <select
          className="border p-2 rounded"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">-- Select Company --</option>
          {companies.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Team Cards */}
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredEmployees.map((emp) => (
            <div key={emp._id} className="border p-4 rounded shadow">
              <img
                src={emp.employeeImage || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-center">
                {emp.employeeName}
              </h3>
              <p className="text-center text-sm">{emp.employeeEmail}</p>
              <p className="text-center text-xs text-gray-500">
                {emp.companyName}
              </p>
              <p className="text-center text-xs font-medium text-blue-600 mt-1">
                {emp.position}
              </p>
              <p className="text-center text-xs font-medium text-green-600 mt-1">
                Assets: {emp.assetsCount ?? 0}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No employees found.</p>
      )}

      {/* Birthdays */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Upcoming Birthdays</h3>
        {birthdays.length ? (
          <ul className="list-disc ml-6">
            {birthdays.map((emp) => (
              <li key={emp._id}>
                {emp.employeeName} —{" "}
                {new Date(emp.dateOfBirth).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No birthdays this month.</p>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
