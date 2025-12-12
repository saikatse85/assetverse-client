import { useEffect } from "react";
import { useState } from "react";
import { FaStar, FaUsers, FaBuilding, FaChartLine } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  const stats = [
    {
      icon: <FaUsers className="w-10 h-10 text-primary" />,
      label: "Companies Trust Us",
      value: "100+",
    },
    {
      icon: <FaBuilding className="w-10 h-10 text-primary" />,
      label: "Assets Managed",
      value: "10k+",
    },
    {
      icon: <FaChartLine className="w-10 h-10 text-primary" />,
      label: "Reports Generated",
      value: "50k+",
    },
  ];

  return (
    <section className="bg-base-100 dark:bg-gray-900 py-20 transition-colors duration-300">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          What Our Clients Say
        </h2>
        <p className="text-gray-400 dark:text-gray-300 text-lg md:text-xl">
          Trusted by hundreds of companies around the globe
        </p>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-base-200 dark:bg-gray-900 p-6 border border-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-colors duration-500 flex flex-col justify-between"
          >
            <div className="mb-4">
              <p className="dark:text-gray-300 mb-2">{t.feedback}</p>
              <div className="flex items-center gap-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                ))}
              </div>
            </div>
            <div className="mt-4 dark:text-gray-200 font-semibold">
              {t.name}
            </div>
            <div className="dark:text-gray-300 text-sm">{t.role}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="bg-base-200 dark:bg-gray-900 p-6 border border-gray-400 rounded-xl shadow-lg hover:shadow-xl transition-colors duration-500 flex flex-col items-center"
          >
            <div className="mb-4">{s.icon}</div>
            <div className="text-3xl dark:text-gray-400 font-bold mb-2">
              {s.value}
            </div>
            <div className="text-gray-500 dark:text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
