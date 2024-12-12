import React from "react";

interface Package {
  itemId: string;
  type: string;
  category: string;
  location: string;
}

const CardElement: React.FC<{ data: Package[] }> = ({ data }) => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-lg dark:bg-darkbox-2 dark:text-darkbox border border-gray-300 bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              To Police Station: {item.location}
            </h2>
            <h3 className="text-lg font-semibold text-gray-800">
              Item ID: {item.itemId}
            </h3>
            <p className="text-gray-600">
              <strong>Type:</strong> {item.type}
            </p>
            <p className="text-gray-600">
              <strong>Category:</strong> {item.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardElement;