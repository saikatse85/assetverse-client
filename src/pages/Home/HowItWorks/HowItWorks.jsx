import { FaUserCheck, FaTools, FaChartLine } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserCheck className="text-primary text-4xl" />,
      title: "Register Your Company",
      desc: "Create your organization account and onboard employees easily.",
    },
    {
      icon: <FaTools className="text-primary text-4xl" />,
      title: "Manage Assets Effortlessly",
      desc: "Assign, request, track assets — all in a single dashboard.",
    },
    {
      icon: <FaChartLine className="text-primary text-4xl" />,
      title: "Analyze & Grow",
      desc: "View analytics, reports & improve decision making faster.",
    },
  ];

  return (
    <section className="bg-base-100 dark:bg-gray-900 py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-400 dark:text-gray-300 mb-12">
          AssetVerse brings simplicity & automation to corporate asset handling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 bg-base-200 dark:bg-gray-900 border border-gray-500 rounded-xl shadow-md hover:shadow-xl transition-transform"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-300 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-400 dark:text-gray-300 mt-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
