import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RequestAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const queryClient = useQueryClient(); // <-- Already Correct
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch available assets
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "https://assetverse-server-lyart.vercel.app/assets"
      );
      return data.filter((asset) => asset.availableQuantity > 0);
    },
  });

  // Submit Request
  const submitRequest = async () => {
    if (!selectedAsset)
      return Swal.fire("Error", "Select an asset first!", "error");
    if (!user) return Swal.fire("Error", "Login required!", "error");

    setLoading(true);

    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      assetImage: selectedAsset.productImage,
      requesterEmail: user?.email,
      profileImage: user?.profileImage,
      employeeImage: user?.profileImage,
      requesterName: user?.displayName || user?.email.split("@")[0],
      hrEmail: selectedAsset.hrEmail ?? "not-provided",
      companyName: selectedAsset.companyName ?? "Unknown",
      companyLogo: selectedAsset.companyLogo ?? "",
      note,
      role: user?.role,
    };

    try {
      const res = await axiosSecure.post(
        "https://assetverse-server-lyart.vercel.app/requests",
        requestData
      );

      Swal.fire("Success", res.data.message ?? "Request submitted!", "success");

      setSelectedAsset(null);
      setNote("");
      queryClient.invalidateQueries(["assets"]); // asset list update
    } catch (err) {
      console.log("❌ ERROR:", err.response?.data);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed request",
        "error"
      );
    }

    setLoading(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Request an Asset</h2>

      {/* Asset List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div key={asset._id} className="border p-4 rounded shadow">
            <img
              src={asset.productImage}
              className="h-32 w-full object-cover rounded"
            />
            <h3 className="font-semibold">{asset.productName}</h3>
            <p>Type: {asset.productType}</p>
            <p>Available: {asset.availableQuantity}</p>

            <button
              onClick={() => setSelectedAsset(asset)}
              className="mt-3 w-full bg-primary text-white py-2 rounded hover:bg-blue-700"
            >
              Request
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-2">
              Request: {selectedAsset.productName}
            </h3>

            <textarea
              placeholder="Add a note"
              className="w-full border p-2 rounded mb-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-400 px-4 py-2 text-white rounded"
                onClick={() => setSelectedAsset(null)}
              >
                Cancel
              </button>
              <button
                className="bg-primary px-4 py-2 text-white rounded"
                onClick={submitRequest}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
