"use client";
import React, { useEffect, useState } from "react";
import LocalInventoryReport from "@/components/reports/LocalInventoryReport";
import AdminInventoryReport from "@/components/reports/AdminInventoryReport";
import AuditReport from "@/components/reports/AuditReport";
import SummaryCard from "@/components/reports/SummaryPage";
import { Box } from "@mui/material";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../auth";
import { toast } from "react-toastify";

// const prisma = new PrismaClient();
// // async function getModelFields() {
// //   const result = await prisma.$queryRaw<
// //     Array<{ column_name: string }>
// //   >`SELECT column_name FROM information_schema.columns WHERE table_name = 'YourTableName'`;

// //   console.log(result.map(row => row.column_name));
// // }

// // getModelFields();

interface AdminReportData {
  summary: {
    totalInventoryValue: number;
    totalItems: number;
    newProcurements: number;
    reorderStatus: number;
    complianceStatus: string;
  };
  inventoryOverview: {
    categories: string[];
    values: number[];
  };
  financialSummary: {
    categories: string[];
    values: number[];
  };
  compliance: {
    labels: string[];
    values: number[];
  };
}

const Reports: React.FC = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [damagedItems, setDamagedItems] = useState(0);
  const [workingItems, setWorkingItems] = useState(0);
  const [adminData, setAdminData] = useState<AdminReportData>({
    summary: {
      totalInventoryValue: 0,
      totalItems: 0,
      newProcurements: 0,
      reorderStatus: 0,
      complianceStatus: "",
    },
    inventoryOverview: {
      categories: [],
      values: [],
    },
    financialSummary: {
      categories: [],
      values: [],
    },
    compliance: {
      labels: [],
      values: [],
    },
  });

  const [localReportData, setLocalReportData] = useState({
    metrics: [
      { label: "", value: 0 },
      { label: "", value: 0 },
      { label: "", value: 0 },
      { label: "", value: 0 },
    ],
    inventoryOverview: [
      { category: "", count: 0 },
      { category: "", count: 0 },
      { category: "", count: 0 },
    ],
    maintenanceStatus: {
      working: 0,
      underRepair: 0,
      outOfOrder: 0,
    },
    inventoryReport: [
      { itemId: 0, name: "", category: "", currentStock: 0 },
      { itemId: 0, name: "", category: "", currentStock: 0 },
      { itemId: 0, name: "", category: "", currentStock: 0 },
    ],
    maintenanceReport: [
      {
        itemId: 0,
        name: "",
        issue: "",
        startDate: "",
      },
      {
        itemId: 0,
        name: "",
        issue: "",
        startDate: "",
      },
    ],
    discardedItems: [
      {
        itemId: 0,
        name: "",
        reason: "",
        discardedDate: "",
      },
      {
        itemId: 0,
        name: "",
        reason: "",
        discardedDate: "",
      },
    ],
  });

  const [user, setUser] = useState<string>("incharge");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/Role", {
          method: "GET",
        });
        const data = await res.json();

        setUser(data);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
    const fetchData = async () => {
      try {
        if (user == "admin") {
          const response = await fetch("/api/reports/mainInventory", {
            method: "GET",
          });
          if (!response.ok) throw new Error("Failed to fetch data");
          const result = await response.json();
          console.log(result);
          setAdminData(result.formData);
          setTotalItems(result.totalItems || 0);
          setDamagedItems(result.damagedItems || 0);
          setWorkingItems(result.workingItems || 0);
          console.log(result);
        } else if (user == "incharge") {
          const response = await fetch("/api/reports/localInventory", {
            method: "GET",
          });
          if (!response.ok) throw new Error("Failed to fetch data");
          const result = await response.json();
          setLocalReportData(result);
          setAdminData(result.formData);
          setTotalItems(result.totalItems);
          setDamagedItems(result.damagedItems);
          setWorkingItems(result.workingItems);
          console.log(localReportData);
        }
      } catch (err: any) {
        alert("Error fetching data: " + err.message);
        toast.error("Error fetching data", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchSession();
    fetchData();
  }, [user]);

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <SummaryCard title="Total Items" value={totalItems} />
        <SummaryCard title="Damaged Items" value={damagedItems} />
        <SummaryCard title="Operational Items" value={workingItems} />

        {/* {user == "admin" ? (
        //   <AdminInventoryReport {...adminData} />
        ) : (
        //   <LocalInventoryReport data={localReportData} />
        )} */}
      </Box>
    </div>
  );
};

export default Reports;
