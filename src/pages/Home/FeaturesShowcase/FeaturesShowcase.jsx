import {
  FaShieldAlt,
  FaRocket,
  FaCogs,
  FaChartPie,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

const FeaturesShowcase = () => {
  const features = [
    {
      icon: <FaShieldAlt className="w-10 h-10 text-primary" />,
      title: "Secure Data",
      description:
        "Your company data is encrypted and securely stored with top-notch protocols.",
    },
    {
      icon: <FaRocket className="w-10 h-10 text-primary" />,
      title: "Fast Performance",
      description:
        "Optimized for speed, AssetVerse ensures smooth operations without delays.",
    },
    {
      icon: <FaCogs className="w-10 h-10 text-primary" />,
      title: "Customizable",
      description:
        "Easily configure settings and workflows to match your organization's needs.",
    },
    {
      icon: <FaChartPie className="w-10 h-10 text-primary" />,
      title: "Analytics & Reports",
      description:
        "Get actionable insights with detailed reporting on asset usage and team performance.",
    },
    {
      icon: <FaUsers className="w-10 h-10 text-primary" />,
      title: "Team Collaboration",
      description:
        "Assign, track, and manage team tasks efficiently with seamless collaboration.",
    },
    {
      icon: <FaHeadset className="w-10 h-10 text-primary" />,
      title: "24/7 Support",
      description:
        "Round-the-clock support to assist you whenever you need help.",
    },
  ];

  return (
    <section className="bg-base-100 dark:bg-gray-900 py-20 transition-colors duration-300">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          Key Features
        </h2>
        <p className="text-gray-400 dark:text-gray-300 text-lg md:text-xl">
          Discover why AssetVerse is the perfect solution for your corporate
          asset management.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-base-100 dark:bg-gray-900 p-6 border border-gray-500 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesShowcase;
