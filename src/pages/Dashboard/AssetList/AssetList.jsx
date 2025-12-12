import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import EditAssetModal from "../../../components/Modal/EditAssetModal";
import Swal from "sweetalert2";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("http://localhost:3000/assets")
      .then((res) => setAssets(res?.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredAssets = assets.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpdate = async (updatedAsset) => {
    try {
      const { _id, ...dataToUpdate } = updatedAsset;

      if (dataToUpdate.productQuantity) {
        dataToUpdate.productQuantity = parseInt(dataToUpdate.productQuantity);
      }

      const res = await axiosSecure.patch(`/assets/${_id}`, dataToUpdate);

      if (res.data.modifiedCount > 0) {
        setAssets(
          assets.map((asset) =>
            asset._id === _id ? { ...asset, ...dataToUpdate } : asset
          )
        );
        setSelectedAsset(null);
        toast.success("Asset updated successfully");
      } else {
        toast.error("No changes applied");
      }
    } catch (err) {
      console.error("Update asset error:", err);
      toast.error("Update failed");
    }
  };
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/assets/${id}`);
    if (res.data.success) {
      setAssets(assets.filter((asset) => asset._id !== id));
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted",
            icon: "success",
          });
        }
      });
    } else {
      toast.error(res.data.message || "Delete failed");
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-3">📦 Asset List</h2>

      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="input input-bordered mb-4"
      />

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
              <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

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
