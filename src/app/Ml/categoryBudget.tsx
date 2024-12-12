'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components for the bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the structure of the data fetched from JSON
interface BudgetData {
  Year: string;
  Category: string;
  'Annual Budget': number;
}

const BudgetBarChart: React.FC = () => {
  const [data, setData] = useState<BudgetData[]>([]); // State to hold the data with the defined interface
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // State for selected category filter
  const [filteredData, setFilteredData] = useState<BudgetData[]>([]); // State to hold filtered data based on the selected category

  useEffect(() => {
    // Fetch the JSON data from the file
    fetch('/budgetval.json')
      .then((response) => response.json())
      .then((jsonData: BudgetData[]) => {
        setData(jsonData);
        setFilteredData(jsonData); // Initially set the filtered data as all data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Extract unique years and categories
  const years = [...new Set(data.map((item) => item.Year))];
  const categories = [...new Set(data.map((item) => item.Category))];

  // Function to handle category filter change
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    
    if (selectedCategory) {
      // Filter data based on the selected category
      const filtered = data.filter(item => item.Category === selectedCategory);
      setFilteredData(filtered);
    } else {
      // If no category is selected, show all data
      setFilteredData(data);
    }
  };

  // Prepare the chart data for the bar chart
  const chartData = {
    labels: years, // X-axis is the years
    datasets: [
      {
        label: selectedCategory || 'All Categories', // Display selected category or "All Categories"
        data: years.map((year) => {
          const entry = filteredData.find((item) => item.Year === year && item.Category === selectedCategory);
          return entry ? entry['Annual Budget'] : 0; // Return the budget value or 0 if no entry
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color for bars
        borderWidth: 1,
      },
    ],
  };

  // Chart options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Annual Budget per Category (Bar Chart)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Annual Budget',
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-start px-4 py-8">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Annual Budget per Category (Bar Chart)</h1>

        {/* Category Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="category-select" className="text-lg font-medium mr-2">Select Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 dark:bg-gray-800 dark:text-white border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Bar chart */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BudgetBarChart;
