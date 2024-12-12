import React from 'react';
import Chart1 from './cat_tot';
import Chart2 from './cond_main';
import Chart3 from './loc_main';
// import Chart4 from './quantityCategory';
import Chart5 from './main_pricerat';
import Chart6 from './count_loc';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const DataAnalysis: React.FC = () => {
  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="DATA ANALYSIS" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="chart-container border p-4 rounded shadow">
          <Chart1 />
          <p className="text-sm mt-2 text-lg md:text-xl font-bold mb-4">This bar chart shows the total number of items available for each category.
"Computer and IT Equipment" and "Medical First Aid" have the highest quantities, suggesting these are the most prevalent items.
Categories like "Surveillance and Tracking" have lower quantities, possibly indicating specialized or limited use.</p>
        </div>
        <div className="chart-container border p-4 rounded shadow">
          <Chart2 />
          <p className="text-sm mt-2 text-lg md:text-xl font-bold mb-4">This bar chart compares the average maintenance cost for items in different conditions (e.g., New, Lost, Repaired, Discarded).
Items in the "Lost" and "Discarded" categories have slightly higher average maintenance costs, indicating inefficiencies or higher resource allocation for non-functional items.
"New" items have negligible maintenance costs,as expected.</p>
        </div>
        <div className="chart-container border p-4 rounded shadow">
          <Chart3 />
          <p className="text-sm mt-2 text-lg md:text-xl font-bold mb-4">This horizontal bar chart compares the average maintenance costs for items at different police station locations.
Shahpura Police Station and Ayodhya Nagar Police Station incur the highest average maintenance charges.
Locations with lower maintenance costs may indicate better equipment handling or newer inventory.</p>
        </div>
        {/* <div className="chart-container border p-4 rounded shadow">
          <Chart4 />
          <p className="text-sm mt-2 text-lg md:text-xl font-bold mb-4">Quantity-wise Category Distribution refers to the distribution of quantities across different categories. In the context of the chart, it means showing how the total quantity is distributed among different categories.</p>
        </div> */}
        <div className="chart-container border p-4 rounded shadow">
          <Chart5 />
          <p className="text-sm mt-2 text-lg md:text-xl font-bold mb-4">This bar chart highlights the maintenance-to-price ratio for each item category.
"Communication Devices" and "Medical First Aid" have the highest maintenance-to-price ratio, suggesting these items are relatively costly to maintain compared to their price.
Categories like "Vehicle and Accessories" and "Firearms" have a low ratio, indicating lower maintenance costs relative to their prices.</p>
        </div>
        <div className="chart-container border p-4 rounded shadow">
          <Chart6 />
          <p className="text-sm mt-2 text-lg md:text-xl font-bold mb-4">This stacked bar chart shows the distribution of different item categories across various police station locations.
Locations like Shahpura Police Station and Mangalwara Police Station have a higher overall count of items.
Categories such as "Communication Devices" and "Protective Gear" appear more frequently across multiple locations, indicating their importance</p>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;