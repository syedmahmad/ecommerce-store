import React from "react";


export const CustomerSection = () => {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Customer Testimonial</span>
        <textarea
          rows={3}
          placeholder="What customers say"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Customer Image</span>
        <input
          type="file"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </label>
    </div>
  );
};
