"use client";
import React, { useEffect, useState } from "react";
import LocalInventoryReport from "@/components/reports/LocalInventoryReport";
import AdminInventoryReport from "@/components/reports/AdminInventoryReport";
import AuditReport from "@/components/reports/AuditReport";
import SummaryCard from "@/components/reports/SummaryPage";
import { Box } from "@mui/material";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { auth } from "../../../../auth";
import { toast } from "react-toastify";

interface CompliancePolicy {
  policy: string;
  status: string;
  percentage: number;
}

interface ValuationCategory {
  categories: string[];
  accuracy: number[];
}

interface Finding {
  category: string;
  finding: string;
  impact: string;
  recommendation: string;
}

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

const ReportsPage: React.FC = () => {
  const [complianceData, setComplianceData] = useState<{
    policies: CompliancePolicy[];
    complianceOverview: number[];
    labels: string[];
  }>({
    policies: [
      { policy: "Procurement Policies", status: "Compliant", percentage: 90 },
      {
        policy: "Storage Policies",
        status: "Partially Compliant",
        percentage: 70,
      },
      {
        policy: "Usage and Deployment Policies",
        status: "Compliant",
        percentage: 85,
      },
      { policy: "Disposal Policies", status: "Non-Compliant", percentage: 60 },
    ],
    complianceOverview: [90, 70, 85, 60],
    labels: ["Procurement", "Storage", "Usage & Deployment", "Disposal"],
  });

  const [valuationData, setValuationData] = useState<{
    categories: string[];
    accuracy: number[];
  }>({
    categories: [
      "Specialized Equipment",
      "Operational Assets",
      "Government-Funded Items",
    ],
    accuracy: [95, 80, 88],
  });
  const [user, setUser] = useState("user");
  const [keyFindings, setKeyFindings] = useState<Finding[]>([
    {
      category: "Storage Policies",
      finding: "Improper storage of arms",
      impact: "Risk of theft or misuse",
      recommendation:
        "Upgrade storage facilities and implement stricter access controls",
    },
    {
      category: "Procurement Policies",
      finding: "Procurement through unapproved vendors",
      impact: "Violation of government protocols",
      recommendation:
        "Restrict procurement to approved vendors and audit regularly",
    },
  ]);
  const [totalItems, setTotalItems] = useState<number>(5);
  const [damagedItems, setDamagedItems] = useState<number>(1);
  const [workingItems, setWorkingItems] = useState<number>(4);

  const [data, setData] = useState<any>({
    complianceData,
    valuationData,
    keyFindings,
    totalItems,
    damagedItems,
    workingItems,
  });

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
    // const fetchData = async () => {
    //   try {
        // if (user == "admin") {
        // const response = await fetch("/api/reports/audit", {
        //   method: "GET",
        // });
        // if (!response.ok) throw new Error("Failed to fetch data");

        // console.log(response);
        // const result = await response.json();
        
        // setData(result);
        // console.log(result);
    //     // setTotalItems(result.totalItems);
    //     // setDamagedItems(result.damagedItems);
    //     // setWorkingItems(result.workingItems);

    //   } catch (err: any) {
    //     // alert("Error fetching data: " + err.message);
    //     // toast.error("Error fetching data", {
    //     //   position: "top-right",
    //     //   autoClose: 3000,
    //     });
    //   }
    // };

    fetchSession();
    // fetchData();
  }, []);

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Box sx={{ padding: 4 }}>
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
        </Box>
        <AuditReport {...data}></AuditReport>
      </Box>
    </div>
  );
};

export default ReportsPage;
