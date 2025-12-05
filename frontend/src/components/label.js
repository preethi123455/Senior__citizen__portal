import React from "react";

export const Label = ({ children, className }) => {
  return <label className={`block font-semibold text-gray-700 ${className}`}>{children}</label>;
};
