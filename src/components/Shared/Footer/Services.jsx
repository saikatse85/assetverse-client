import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/whyassetverse.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <div className="min-h-screen max-w-7xl m-auto px-6 py-12 bg-base-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-10  dark:text-white">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-base-800 dark:bg-gray-800 border border-gray-400 rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2  dark:text-white">
              {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
