import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpgradePackage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Load packages with Tanstack Query
  const {
    data: packages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure(
        "https://assetverse-server-lyart.vercel.app/packages"
      );
      return res.data;
    },
  });

  // Stripe Checkout Redirect

  const handleCheckout = async (pkg) => {
    try {
      const { data } = await axiosSecure.post(
        "https://assetverse-server-lyart.vercel.app/create-payment-session",
        {
          email: user.email,
          packageName: pkg.name,
          price: pkg.price,
          employeeLimit: pkg.employeeLimit,
        }
      );

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe URL Missing!");
      }
    } catch (err) {
      console.error(
        "Stripe Checkout Error:",
        err.response?.data || err.message
      );
      toast.error("Payment initiation failed!");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">Package loading failed!</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Upgrade Package</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="border p-6 rounded-lg shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold">{pkg.name}</h3>
            <p className="text-lg font-bold text-primary">${pkg.price}</p>
            <p className="text-sm opacity-80">
              Employee Limit: Number{pkg.employeeLimit}
            </p>

            <ul className="mt-2 list-disc list-inside text-sm">
              {pkg.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button
              className="btn btn-primary w-full mt-4"
              onClick={() => handleCheckout(pkg)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;
