'use client';
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataEntry {
  Location: string;
  Category: string;
}

const StackedBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DataEntry[] = await response.json();

        // Group data by Location and Category
        const groupedData: Record<string, Record<string, number>> = {};
        const categories = new Set<string>();

        data.forEach((item) => {
          if (!groupedData[item.Location]) {
            groupedData[item.Location] = {};
          }
          if (!groupedData[item.Location][item.Category]) {
            groupedData[item.Location][item.Category] = 0;
          }
          groupedData[item.Location][item.Category] += 1;
          categories.add(item.Category);
        });

        const locations = Object.keys(groupedData);
        const categoryArray = Array.from(categories);

        const datasets = categoryArray.map((category) => ({
          label: category,
          data: locations.map((location) => groupedData[location][category] || 0),
          backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
            Math.random() * 255,
          )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
        }));

        setChartData({
          labels: locations,
          datasets,
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index" as const, // Use the expected literal type
        intersect: false,
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Location",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Count of Items",
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4">Location-wise Count of Items by Category</h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StackedBarChart;

