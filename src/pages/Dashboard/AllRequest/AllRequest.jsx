import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //  FETCH REQUESTS
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "https://assetverse-server-lyart.vercel.app/requests"
      );
      return res.data;
    },
  });

  // APPROVE REQUEST
  const handleApprove = async (id, reqObj) => {
    try {
      const res = await axiosSecure.post(
        "https://assetverse-server-lyart.vercel.app/assigned-assets",
        {
          assetId: reqObj.assetId,
          assetName: reqObj.assetName,
          assetType: reqObj.assetType,
          employeeEmail: reqObj.requesterEmail,
          employeeName: reqObj.requesterName,
          companyName: reqObj.companyName,
          assetImage: reqObj.assetImage || reqObj.productImage || "",
          requestId: id,
          role: reqObj.role,
          requestDate: reqObj.requestDate,
          profileImage: reqObj.profileImage,
          employeeImage: reqObj.profileImage,
          hrEmail: user?.email,
          approvalDate: new Date(),
        }
      );

      if (res.data.success) {
        Swal.fire("Success", "Asset Assigned Successfully", "success");
        refetch(); // Refresh table instantly
      } else {
        Swal.fire("Error", res.data.message || "Approval failed", "error");
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Approval failed",
        "error"
      );
    }
  };

  //  REJECT REQUEST (Optional)
  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(
        `https://assetverse-server-lyart.vercel.app/requests/reject/${id}`,
        {
          status: "rejected",
        }
      );

      Swal.fire("Rejected", "Request has been rejected", "warning");
      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Rejection failed!", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">All Asset Requests</h2>

      <div className="overflow-x-auto rounded-lg border">
        <table className="table w-full">
          <thead className="dark:text-white font-semibold">
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Employee</th>
              <th>Company</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, i) => (
              <tr key={req._id} className="border-b">
                <td>{i + 1}</td>
                <td>{req.assetName}</td>
                <td>{req.assetType}</td>
                <td>
                  <p>{req.requesterName}</p>
                  <small className="text-xs text-gray-500">
                    {req.requesterEmail}
                  </small>
                </td>
                <td>{req.companyName}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.requestStatus === "approved"
                        ? "bg-green-600"
                        : req.requestStatus === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button
                    disabled={req.requestStatus === "approved"}
                    onClick={() => handleApprove(req._id, req)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Approve
                  </button>
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleReject(req._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No pending requests found!
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
