"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const categoryDrop = [
  { name: "COMMUNICATION_DEVICES" },
  { name: "COMPUTER_AND_IT_EQUIPMENT" },
  { name: "NETWORKING_EQUIPMENT" },
  { name: "SURVEILLANCE_AND_TRACKING" },
  { name: "VEHICLE_AND_ACCESSORIES" },
  { name: "PROTECTIVE_GEAR" },
  { name: "FIREARMS" },
  { name: "FORENSIC" },
  { name: "MEDICAL_FIRST_AID" },
  { name: "OFFICE_SUPPLIES" },
];

const avail = [{ name: "AVAILABLE" }, { name: "UNAVAILABLE" }];

interface Package {  
  itemId: string;
  category: string;
  type: string;
  description?: string;
  location?: string;
  condition: string;
  expiryDate?: string;
  returnDate?: string;
  maintenanceSchedule?: string;
  userId?: string;
  status?: string;
}

const defaultPackages: Package[] = [
  {
    itemId: "item001",
    category: "COMPUTER_AND_IT_EQUIPMENT",
    type: "Laptop",
    description: "High-performance laptop for IT department tasks.",
    condition: "New",
    expiryDate: "2025-01-01",
    returnDate: "2024-12-01",
    maintenanceSchedule: "Monthly",
    status: "AVAILABLE",
  },
  {
    itemId: "item002",
    category: "FIREARMS",
    type: "Pistol",
    description: "Standard issue pistol for security personnel.",
    condition: "Used",
    expiryDate: "2026-05-01",
    status: "UNAVAILABLE",
  },
];


const PackageTable = () => {
  const [packages, setPackages] = useState<Package[]>(defaultPackages); // Default data as initial state
  const [filteredPackages, setFilteredPackages] = useState<Package[]>(defaultPackages); // Initially display default data
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/userDashboard"); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data: Package[] = await response.json();
        if (data.length > 0) {
          setPackages(data);
          setFilteredPackages(data);
        } else {
          throw new Error("No data found.");
        }
      } catch (error: any) {
        console.error(error.message); // Log the error for debugging
        setPackages(defaultPackages); // Use default data in case of error
        setFilteredPackages(defaultPackages); // Display fallback data
        toast.error("Error fetching previous requests", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = packages.filter((pkg) => {
      const categoryMatch =
        !categoryFilter || pkg.category === categoryFilter;
      const availabilityMatch =
        !availabilityFilter || pkg.status === availabilityFilter;
      return categoryMatch && availabilityMatch;
    });
    setFilteredPackages(filtered);
  }, [packages, categoryFilter, availabilityFilter]);

  if (loading) {
    return <p>Loading packages...</p>;
  }

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      {/* Filters */}
      <div className="mb-8 flex gap-4">
        {/* Category Filter */}
        <select
          className="rounded-lg border px-4 py-2 shadow-sm  dark:border-form-strokedark dark:bg-form-input dark:text-white"
          value={categoryFilter || ""}
          onChange={(e) => setCategoryFilter(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categoryDrop.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        {/*{/*Availability Filter*}
        <select
          className="rounded-lg border px-4 py-2 shadow-sm  dark:border-form-strokedark dark:bg-form-input dark:text-white"
          value={availabilityFilter || ""}
          onChange={(e) => setAvailabilityFilter(e.target.value || null)}
        >
          <option value="">All Status</option>
          {avail.map((status) => (
            <option key={status.name} value={status.name}>
              {status.name}
            </option>
          ))}
        </select>*/}
      </div>

      {/* Card Layout */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-300 bg-white p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out dark:border-strokedark dark:bg-boxdark dark:text-white "
            >
              <div className="mb-4 flex items-center justify-between dark:border-strokedark dark:bg-boxdark dark:text-white">
                <h3 className="text-lg font-semibold text-gray-800 dark:border-strokedark dark:bg-boxdark dark:text-white">
                  {pkg.type}
                </h3>
                {/*<span
                  className={`rounded-lg px-3 py-1 text-xs font-medium ${
                    pkg.status === "AVAILABLE"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {pkg.status}
                </span>*/}
              </div>
              <p className="mb-2 text-sm text-gray-600 dark:border-strokedark dark:bg-boxdark dark:text-white">
                <strong>Category:</strong> {pkg.category.replace(/_/g, " ")}
              </p>
              <p className="mb-2 text-sm text-gray-600 dark:border-strokedark dark:bg-boxdark dark:text-white">
                <strong>Description:</strong> {pkg.description || "N/A"}
              </p>
              <p className="mb-2 text-sm text-gray-600 dark:border-strokedark dark:bg-boxdark dark:text-white">
                <strong>Condition:</strong> {pkg.condition}
              </p>
              <p className="mb-2 text-sm text-gray-600 dark:border-strokedark dark:bg-boxdark dark:text-white">
                <strong>Expiry Date:</strong> {pkg.expiryDate || "N/A"}
              </p>
              <p className="mb-2 text-sm text-gray-600 dark:border-strokedark dark:bg-boxdark dark:text-white">
                <strong>Return Date:</strong> {pkg.returnDate || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No packages found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default PackageTable;