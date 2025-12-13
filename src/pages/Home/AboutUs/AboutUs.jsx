import { FaCheckCircle, FaUsers, FaClock, FaChartLine } from "react-icons/fa";

const AboutUs = () => {
  const benefits = [
    {
      icon: <FaUsers className="text-primary w-10 h-10" />,
      title: "Team Collaboration",
      description:
        "Easily manage your employees and teams with real-time updates and seamless communication.",
    },
    {
      icon: <FaCheckCircle className="text-primary w-10 h-10" />,
      title: "Efficient Asset Tracking",
      description:
        "Keep track of all assets assigned to employees, reducing loss and optimizing usage.",
    },
    {
      icon: <FaClock className="text-primary w-10 h-10" />,
      title: "Time Saving Automation",
      description:
        "Automate request approvals and inventory updates to save valuable HR time.",
    },
    {
      icon: <FaChartLine className="text-primary w-10 h-10" />,
      title: "Insightful Analytics",
      description:
        "Get detailed reports on asset usage, employee performance, and team productivity.",
    },
  ];

  return (
    <section className="bg-base-100 dark:bg-gray-900 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          Why Choose AssetVerse?
        </h2>
        <p className="text-gray-500 dark:text-gray-500 text-lg md:text-xl">
          AssetVerse empowers your company with professional asset management,
          efficient team collaboration, and actionable insights.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-base-50 btn-primary dark:text-white p-6 border border-l-gray rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl dark:text-gray-400 font-semibold mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-400 dark:text-gray-600">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
