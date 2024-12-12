'use client';
import React, { useEffect, useState } from "react";

const UserTable: React.FC = () => {
  const [userArray, setUserArray] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/starOfficer", { method: "GET" }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUserArray(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const generateStars = (numStars: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="text-yellow-500">
        {index < numStars ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Performance Leaderboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                  Gov ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                  Location
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                  Role
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-600">
                  Stars
                </th>
              </tr>
            </thead>
            <tbody>
              {userArray.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.govId}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {generateStars(user.stars)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
