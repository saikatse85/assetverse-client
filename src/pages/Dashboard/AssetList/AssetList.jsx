import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import EditAssetModal from "../../../components/Modal/EditAssetModal";
import Swal from "sweetalert2";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [limit] = useState(10); // configurable
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  // 🔹 Fetch assets with pagination
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assets", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://assetverse-server-lyart.vercel.app/assets?page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const assets = data.assets || [];
  const totalPages = data.totalPages || 1;

  // 🔹 Client-side search (only current page)
  const filteredAssets = assets.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 UPDATE
  const handleUpdate = async (updatedAsset) => {
    try {
      const { _id, ...dataToUpdate } = updatedAsset;

      if (dataToUpdate.productQuantity) {
        dataToUpdate.productQuantity = parseInt(dataToUpdate.productQuantity);
      }

      const res = await axiosSecure.patch(`/assets/${_id}`, dataToUpdate);

      if (res.data.modifiedCount > 0) {
        toast.success("Asset updated successfully");
        setSelectedAsset(null);
        refetch();
      } else {
        toast.error("No changes applied");
      }
    } catch (err) {
      toast.error("Update failed", err);
    }
  };

  // 🔹 DELETE
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/assets/${id}`);
      if (res.data.success) {
        Swal.fire("Deleted!", "Asset has been deleted.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-3">📦 Asset List</h2>

      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="input input-bordered mb-4"
      />

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <img src={asset.productImage} className="w-12 h-12 rounded" />
                </td>
                <td>{asset.productName}</td>
                <td>{asset.productType}</td>
                <td>{asset.productQuantity}</td>
                <td>
                  {asset.dateAdded
                    ? new Date(asset.dateAdded).toLocaleDateString()
                    : "-"}
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 DaisyUI Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
            onClick={() => setPage(num + 1)}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <EditAssetModal
        asset={selectedAsset}
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default AssetList;
