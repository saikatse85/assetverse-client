import React from "react";

const UIButton = ({ children, onClick, color = "primary" }) => {
  const baseClasses =
    "px-4 py-2 rounded-full font-semibold text-white hover:opacity-90 duration-200";

  let colorClass = "";
  switch (color) {
    case "success":
      colorClass = "bg-green-600";
      break;
    case "error":
      colorClass = "bg-red-600";
      break;
    case "warning":
      colorClass = "bg-yellow-500 text-black";
      break;
    default:
      colorClass = "bg-blue-600";
  }

  return (
    <button className={`${baseClasses} ${colorClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default UIButton;
