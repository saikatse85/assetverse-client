import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyEmployeeList = () => {
  const { user } = useAuth();
  const hrEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["employees", hrEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://assetverse-server-lyart.vercel.app/hr/employees/${hrEmail}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handleRemove = async (employeeId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This employee will be removed from your team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(
          `https://assetverse-server-lyart.vercel.app/hr/remove-employee/${employeeId}`
        );
        Swal.fire("Removed!", "Employee has been removed.", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to remove employee", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Employee List</h2>
      <p className="mb-4">Employees: {employees.length}</p>

      <div className="overflow-x-auto rounded-lg border">
        <table className="table w-full">
          <thead className="dark:text-white font-semibold">
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No employees found!
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>
                    <img
                      src={
                        emp.employeeImage || "https://via.placeholder.com/40"
                      }
                      alt={emp.employeeName}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{emp.employeeName}</td>
                  <td>{emp.employeeEmail}</td>
                  <td>
                    {emp.joinDate
                      ? new Date(emp.joinDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{emp.assetsCount || 0}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleRemove(emp._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
