import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Utils/index";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const axiosSecure = useAxiosSecure();
  const hrEmail = user?.email;

  // Image Upload
  const handleImageChange = async (e) => {
    setLoading(true);
    try {
      const url = await imageUpload(e.target.files[0]);
      setImageURL(url);
    } catch (err) {
      toast.error("Image upload failed:", err);
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (!imageURL) {
      toast.error("Please upload an image first");
      return;
    }

    const newAsset = {
      productName: data.productName,
      productImage: imageURL,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      availableQuantity: parseInt(data.productQuantity),
      dateAdded: new Date(),
      hrEmail,
      companyName: data.companyName,
    };

    try {
      const response = await axiosSecure.post(
        "http://localhost:3000/assets",
        newAsset,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = response.data;

      if (result.insertedId || result.success) {
        toast.success("✔ Asset Added Successfully!");
        reset();
        setImageURL("");
      } else {
        toast.error("Failed to add! Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error!");
    }
  };

  return (
    <div
      className="max-w-xl mx-auto p-8 mt-10 shadow rounded bg-base-100
     "
    >
      <h2 className="text-2xl font-bold mb-6">Add New Asset</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="font-medium">Product Name:</label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name is required",
            })}
            placeholder="Enter product name"
            className="input input-bordered w-full mt-2 bg-white dark:bg-gray-700 dark:text-white"
          />
          {errors.productName && (
            <p className="text-red-500">{errors.productName.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="font-medium">Company Name:</label>
          <input
            type="text"
            {...register("companyName", {
              required: "Company name is required",
            })}
            placeholder="Enter company name"
            className="input input-bordered w-full mt-2 bg-white dark:bg-gray-700 dark:text-white"
          />
          {errors.companyName && (
            <p className="text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label className="font-medium">Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full mt-2 bg-white dark:bg-gray-700 dark:text-white"
          />
          {loading && <p className="text-blue-400">Uploading...</p>}
          {imageURL && <img src={imageURL} className="w-24 mt-2 rounded" />}
        </div>

        {/* Product Type */}
        <div>
          <label className="font-medium">Product Type:</label>
          <select
            {...register("productType", { required: "Select product type" })}
            className="select select-bordered w-full mt-2 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="font-medium">Product Quantity:</label>
          <input
            type="number"
            min="1"
            {...register("productQuantity", { required: "Quantity required" })}
            className="input input-bordered w-full mt-2 bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
