"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const policeStations = [
  { name: "TT Nagar Police Station", lat: 23.23725, long: 77.39984 },
  { name: "Kamla Nagar Police Station", lat: 23.21554, long: 77.39552 },
  { name: "Shyamla Hills Police Station", lat: 23.2457, long: 77.4107 },
  { name: "Habibganj Police Station", lat: 23.2295, long: 77.4381 },
  { name: "Piplani Police Station", lat: 23.2289, long: 77.4718 },
  { name: "Govindpura Police Station", lat: 23.2587, long: 77.4935 },
  { name: "Ashoka Garden Police Station", lat: 23.2494, long: 77.4631 },
  { name: "MP Nagar Police Station", lat: 23.2332, long: 77.4272 },
  { name: "Bhopal Kotwali Police Station", lat: 23.2689, long: 77.4012 },
  { name: "Hanumanganj Police Station", lat: 23.2812, long: 77.4135 },
  { name: "Chhola Mandir Police Station", lat: 23.2856, long: 77.4343 },
  { name: "Shahpura Police Station", lat: 23.1945, long: 77.4423 },
  { name: "Misrod Police Station", lat: 23.1734, long: 77.4802 },
  { name: "Kolar Police Station", lat: 23.1678, long: 77.4187 },
  { name: "Jahangirabad Police Station", lat: 23.2635, long: 77.4273 },
  { name: "Mangalwara Police Station", lat: 23.2721, long: 77.4224 },
  { name: "Talaiya Police Station", lat: 23.2685, long: 77.4152 },
  { name: "Ayodhya Nagar Police Station", lat: 23.2467, long: 77.4823 },
  { name: "Bagh Sewania Police Station", lat: 23.2118, long: 77.4756 },
  { name: "Khajuri Sadak Police Station", lat: 23.1245, long: 77.5712 },
  { name: "Ratibad Police Station", lat: 23.1101, long: 77.3865 },
  { name: "Berasia Police Station", lat: 23.6352, long: 77.4323 },
];

const AuditReport: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [filteredStations, setFilteredStations] = useState(policeStations);

  const handleSearch = () => {
    if (selectedStation) {
      const filtered = policeStations.filter((station) =>
        station.name.toLowerCase().includes(selectedStation.toLowerCase()),
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations(policeStations);
    }
  };

  const handleDownloadReport = (station: (typeof policeStations)[0]) => {
     const router = useRouter();
     router.push(`/adminPages/monthlyReport/${station.name}`);
      
  };

  const handleDownloadAudit = (station: (typeof policeStations)[0]) => {
    const res = fetch('/api/download-audit', {
      method: 'POST',
      body: JSON.stringify({ location: station.name })
    });
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <h1 className="font-medium text-black dark:text-white">
        Police Stations
      </h1>
      <div className="mb-4 flex items-center space-x-4">
        <select
          value={selectedStation}
          onChange={(e) => setSelectedStation(e.target.value)}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="">Select a police station</option>
          {policeStations.map((station) => (
            <option key={station.name} value={station.name}>
              {station.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                Station Name
              </th>
              <th className="border border-gray-300 px-4 py-2  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStations.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  No matching police stations found.
                </td>
              </tr>
            ) : (
              filteredStations.map((station) => (
                <tr key={station.name}>
                  <td className="border border-gray-300 px-4 py-2 text-black dark:text-white">
                    {station.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                        onClick={() => handleDownloadReport(station)}
                      >
                        Download Report
                      </button>
                      <button
                        className="rounded bg-yellow-500 px-4 py-2 text-white"
                        onClick={() => handleDownloadAudit(station)}
                      >
                        Download Audit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditReport;
