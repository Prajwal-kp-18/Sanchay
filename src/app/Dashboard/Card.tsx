import React from "react";

interface CardDataStatsProps {
  statusCounts: { [key: string]: number }; // Add statusCounts prop
  onClick?: () => void;
  children?: React.ReactNode;
  icon?: string; // Add an optional icon prop
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  statusCounts,
  onClick,
  children,
  icon, // Destructure icon from props
}) => {
  return (
    <div
      className="relative min-h-[4rem] rounded bg-white p-10 pt-10 shadow-md dark:border-strokedark dark:bg-boxdark" // Change background color to match charts
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {icon && (
        <div className="flex items-center justify-center mb-5 mt-5">
          <div className="h-16 w-16 scale-75 flex items-center justify-center rounded-full bg-gray-300 p-3 md:h-20 md:w-20 md:p-4 lg:h-24 lg:w-24 lg:p-5">
            <img src={icon} alt="" className="object-contain" /> {/* Icon within the circle */}
          </div>
        </div>
      )}
      <div className="mt-10 break-words pt-15">
        {Object.entries(statusCounts).map(([status, count]) => (
          <p key={status.replaceAll("_", " ")}>
            {status.replaceAll("_", " ")} : {count} {/* Display the count for each status */}
          </p>
        ))}
      </div>
      {children}
    </div>
  );
};

export default CardDataStats;