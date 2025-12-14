import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthContext";
import { imageUpload } from "../../../Utils";
import { useNavigate } from "react-router";
import axios from "axios";

const JoinEmployee = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleEmployeeRegister = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { name, email, image, password, dateOfBirth } = data;
      const imageFile = image[0];

      // 🔹 Upload Image & get URL
      const imageURl = await imageUpload(imageFile);

      // 1️⃣ Create user in Firebase
      await createUser(email, password);
      await updateUserProfile(name, imageURl);

      // 2️⃣ Send user data to backend (save to MongoDB)
      const userData = {
        name,
        email,
        dateOfBirth,
        role: "employee",
        profileImage: imageURl,
        createdAt: new Date(),
      };
      await axios.post(
        "https://assetverse-server-lyart.vercel.app/users",
        userData
      );

      setSuccess("Employee account created successfully!");
      navigate("/");
      reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-base-100 dark:bg-gray-900 transition-colors">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-gray-300">
          Join as Employee
        </h2>

        <form
          onSubmit={handleSubmit(handleEmployeeRegister)}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="font-semibold text-gray-300 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
              placeholder="Enter Full Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* Image*/}
          <div>
            <label className="font-semibold text-gray-300 dark:text-gray-200">
              Image URL
            </label>
            <fieldset className="fieldset">
              <label className="label">Max size 2MB</label>
              <input
                type="file"
                {...register("image", {
                  required: "Image is required",
                })}
                className="file-input input-bordered w-full"
                placeholder="Image URL (ImgBB/Cloudinary)"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </fieldset>
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-300 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-gray-300 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/,
                  message:
                    "Password must include 1 lowercase, 1 uppercase, and 1 special character",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="font-semibold text-gray-300 dark:text-gray-200">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Status messages */}
        {success && (
          <p className="text-green-500 mt-3 text-center">{success}</p>
        )}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default JoinEmployee;
