import React from "react";

const UITextField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-white mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
        className="w-full bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-1 shadow-md focus:shadow-lg focus:shadow-rose-400"
        autoComplete="off"
      />
    </div>
  );
};

export default UITextField;
