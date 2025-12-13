import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyAssets = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const axiosSecure = useAxiosSecure();

  // Fetch assigned assets for current employee
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignedAssets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://assetverse-server-lyart.vercel.app/assigned-assets/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  // Filter & search logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = filterType ? asset.assetType === filterType : true;
    return matchesSearch && matchesType;
  });

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("assets-table").outerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(
      "<html><head><title>My Assets</title></head><body>"
    );
    newWindow.document.write(printContent);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  const handleReturn = async (_id) => {
    try {
      await axios.patch(
        `https://assetverse-server-lyart.vercel.app/assigned-assets/return/${_id}`
      );
      refetch();
      toast.success("Asset returned successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to return asset");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Assets</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Asset Name..."
          className="input input-bordered w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
        <button
          onClick={handlePrint}
          className="btn btn-primary w-full md:w-auto"
        >
          Print
        </button>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto">
        <table className="table w-full" id="assets-table">
          <thead className="bg-base-200 dark:bg-gray-800 font-semibold">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No assets found.
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <img
                      src={asset.assetImage || "https://via.placeholder.com/40"}
                      alt={asset.assetName}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.companyName}</td>
                  <td>
                    {asset.requestDate
                      ? new Date(asset.requestDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {asset.approvalDate
                      ? new Date(asset.approvalDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{asset.status}</td>
                  <td>
                    {asset.status === "assigned" &&
                    asset.assetType === "Returnable" ? (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-sm btn-warning"
                      >
                        Return
                      </button>
                    ) : (
                      "-"
                    )}
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

export default MyAssets;
