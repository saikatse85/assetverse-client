import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";

const PackagesSection = () => {
  // Fetch packages from backend
  const {
    data: packages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get(
        "https://assetverse-server-lyart.vercel.app/packages"
      );
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Failed to load packages.</p>
    );

  return (
    <section className="bg-base-100 dark:bg-gray-900 py-20 transition-colors duration-300">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          Our Packages
        </h2>
        <p className="text-gray-600 dark:text-gray-200 text-lg md:text-xl">
          Choose the package that suits your company's needs. Upgrade anytime as
          your business grows.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-400 transition flex flex-col justify-between"
          >
            {/* Package Header */}
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-semibold mb-2 dark:text-white">
                {pkg.name}
              </h3>
              <p className=" dark:text-white">
                Up to {pkg.employeeLimit} employees
              </p>
            </div>

            {/* Features */}
            <ul className="mb-6 space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 dark:text-white">
                  <span className="text-primary">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price & Button */}
            <div className="text-center mt-auto">
              <p className="text-3xl font-bold mb-4 dark:text-white">
                ${pkg.price}/month
              </p>
              <Link
                to="/login"
                className="btn px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-focus transition"
              >
                Choose Plan
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
