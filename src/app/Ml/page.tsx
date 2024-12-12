

///////////////////////////////////////COST ANALYSIS//////////////////////////////////////////////////

// 'use client';
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import React, { useEffect, useState } from 'react';
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label,
// } from 'recharts';

// const formatNumber = (num: number): string => {
//   return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
// };

// const ChartComponent = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/get_chart_data')
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
//           actualPrice: actualPrice / 1_000_000, // Scaling down to millions
//           predictedPrice: data.y_pred[index] / 1_000_000,
//         }));
//         setChartData(formattedData);
//       })
//       .catch((error) => console.error('Error fetching chart data:', error));
//   }, []);

//   return (
//     <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
//       <Breadcrumb pageName="ML MODEL PREDICTIONS" />
//     <div className="flex justify-center items-center min-h-screen bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm font-medium text-black dark:text-white">
//         <h2 className="text-xl font-semibold text-center text-gray-800 mb-4 text-sm font-medium text-black dark:text-white">
//           Actual Prices vs Predicted Prices
//         </h2>
//         <ResponsiveContainer width="100%" height={350}>
//           <ScatterChart>
//             <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//             <XAxis
//               type="number"
//               dataKey="actualPrice"
//               name="Actual Price"
//               tick={{ fontSize: 12, fill: '#333' }}
//               stroke="#333"
//             >
//               <Label
//                 value="Actual Price (₹ in Millions)"
//                 offset={-5}
//                 position="insideBottom"
//                 style={{ fill: '#333', fontSize: '14px' }}
//               />
//             </XAxis>
//             <YAxis
//               type="number"
//               dataKey="predictedPrice"
//               name="Predicted Price"
//               tick={{ fontSize: 12, fill: '#333' }}
//               stroke="#333"
//             >
//               <Label
//                 value="Predicted Price (₹ in Millions)"
//                 angle={-90}
//                 position="insideLeft"
//                 style={{ fill: '#333', fontSize: '14px', textAnchor: 'middle' }}
//               />
//             </YAxis>
//             <Tooltip
//               formatter={(value: number) => formatNumber(value * 1_000_000)} // Revert scaling for display
//               cursor={{ strokeDasharray: '3 3' }}
//             />
//             <Scatter
//               name="Price Prediction"
//               data={chartData}
//               fill="#34D399"
//               line={{ stroke: '#10B981', strokeWidth: 2 }}
//               shape="circle"
//             />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ChartComponent;


















/////////////////////BUDGET IMPLEMENTATION///////////////////////////////////////////////



// 'use client';
// import React, { useState } from 'react';

// function App() {
//   const [year, setYear] = useState('');
//   const [category, setCategory] = useState('');
//   const [result, setResult] = useState<any>();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const categories = [
//     "Communication Devices",
//     "Computer and IT Equipment",
//     "Firearms",
//     "Forensic",
//     "Medical First Aid",
//     "Networking Equipment",
//     "Office Supplies",
//     "Protective Gear",
//     "Surveillance and Tracking",
//     "Vehicle and Accessories",
//   ];

//   // Handle form submission and call the backend API
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       // Call the backend API
//       const response = await fetch('https://budgetproject-nw5c.onrender.com/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ year, category })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setResult({
//           buy_price: data.buy_price * 100,
//           maintenance_cost: data.maintenance_cost * 100,
//           total_price: data.total_price * 100,
//           annual_budget: data.annual_budget * 100,
//         });
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//       setError('Failed to fetch data from backend');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//         <h1 className="text-2xl font-bold mb-4 text-center">Budget Calculator</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Year:</label>
//             <input
//               type="number"
//               // value={year}
//               onChange={(e) => setYear(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-primary dark:text-white"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Category:</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="w-full px-4 py-2 border rounded-md text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-primary dark:text-white"
//             >
//               <option value="" disabled>
//                 Select a category
//               </option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full px-4 py-2 rounded-md text-white font-medium transition 
//               ${loading ? 'bg-gray-400 cursor-default' : 'bg-blue-500 hover:bg-blue-600'}
//               disabled:bg-gray-400`}
//           >
//             {loading ? 'Calculating...' : 'Submit'}
//           </button>
//         </form>

//         {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

//         {result && (
//           <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
//             <h2 className="text-lg font-bold mb-4 text-center text-blue-500">Results</h2>
//             <div className="space-y-2">
//               <p className="flex justify-between">
//                 <span className="font-medium">Buy Price:</span>
//                 <span>{result.buy_price}</span>
//               </p>
//               <p className="flex justify-between">
//                 <span className="font-medium">Maintenance Cost:</span>
//                 <span>{result.maintenance_cost}</span>
//               </p>
//               <p className="flex justify-between">
//                 <span className="font-medium">Total Price:</span>
//                 <span>{result.total_price}</span>
//               </p>
//               <p className="flex justify-between">
//                 <span className="font-medium">Annual Budget:</span>
//                 <span>{result.annual_budget}</span>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
'use client';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Chart1 from './categoryBudget';

// import Chart3 from './heatmap';
// Registering required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function App() {
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    "Communication Devices",
    "Computer and IT Equipment",
    "Firearms",
    "Forensic",
    "Medical First Aid",
    "Networking Equipment",
    "Office Supplies",
    "Protective Gear",
    "Surveillance and Tracking",
    "Vehicle and Accessories",
  ];

  // Handle form submission and call the backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Call the backend API
      const response = await fetch('https://budgetproject-nw5c.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year, category })
      });

      const data = await response.json();
      if (response.ok) {
        setResult({
          buy_price: data.buy_price * 100,
          maintenance_cost: data.maintenance_cost * 100,
          total_price: data.total_price * 100,
          annual_budget: data.annual_budget * 100,
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch data from backend');
    } finally {
      setLoading(false);
    }
  };

  // Chart Data
  const chartData = result
    ? {
        labels: ['Buy Price', 'Maintenance Cost', 'Total Price', 'Annual Budget'],
        datasets: [
          {
            label: 'Predicted Values',
            data: [result.buy_price, result.maintenance_cost, result.total_price, result.annual_budget],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }
    : null;

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Predicted Budget Values',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center px-4">
      {/* Top: Budget Calculator */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 mt-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Budget Calculator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year:</label>
            <input
              type="number"
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-primary dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-black outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-primary dark:text-white"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md text-white font-medium transition 
              ${loading ? 'bg-gray-400 cursor-default' : 'bg-blue-500 hover:bg-blue-600'}
              disabled:bg-gray-400`}
          >
            {loading ? 'Calculating...' : 'Submit'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center text-blue-500">Results</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="font-medium">Buy Price:</span>
                <span>{result.buy_price}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Maintenance Cost:</span>
                <span>{result.maintenance_cost}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Total Price:</span>
                <span>{result.total_price}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Annual Budget:</span>
                <span>{result.annual_budget}</span>
              </p>
            </div>
          </div>
        )}
      </div>
<Chart1/>
      
      

     
    </div>
  );
}

export default App;
