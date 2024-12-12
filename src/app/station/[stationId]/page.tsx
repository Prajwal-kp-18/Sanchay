"use client";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import AWS from "aws-sdk";
import { S3 } from "aws-sdk";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { toast } from "react-toastify";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../auth";
import { sendingEmail } from "@/lib/mail";

interface Package {
  itemId: string;
  category: string;
  type: string;
  description?: string;
  quantity: number;
  location?: string;
  condition: string;
  acquisitionDate?: string;
  expiryDate?: string;
  price?: number;
  supplier?: string;
  assignedTo?: string;
  returnDate?: string;
  lastInspectionDate?: string;
  maintenanceSchedule?: string;
  maintenanceCharge?: number;
  issuedTo?: string;
  userId?: string;
  user?: string | null;
  status?: string;
  communicationDevice?: any;
  computerAndITEquipment?: any;
  networkingEquipment?: any;
  surveillanceAndTracking?: any;
  vehicleAndAccessories?: any;
  protectiveGear?: any;
  firearm?: any;
  forensic?: any;
  medicalFirstAid?: any;
  officeSupply?: any;
}

const defaultData: Package[] = [];

const ViewInventoryIndividual = () => {
  const [packageData, setPackageData] = useState<Package[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<number | null>(null); // Track the row being edited by index
  const [editedRow, setEditedRow] = useState<Partial<Package>>({}); // Store data being edited
  // const [rowToDelete, setRowToDelete] = useState<number | null>(null); // Track the row to delete

  const params = useParams();

  const [transferMode, setTransferMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<{
    [id: string | number]: boolean;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferLocation, setTransferLocation] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [selectedTransferDetails, setSelectedTransferDetails] = useState<
    Package[]
  >([]);
  const handleTransferClick = () => {
    setTransferMode(true);
  };
  const [file, setFile] = useState<any>();

  // AWS S3 Setup
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  interface EquipmentDetailsProps {
    equipment: Record<string, string | null | undefined>; // Object with string keys and nullable/undefined string values
    excludeNullValues: (value: string | null | undefined) => string; // Function to process nullable/undefined strings
  }
  const selectedDetails = packageData.filter(
    (item) => selectedItems[item.itemId],
  );

  const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({
    equipment,
    excludeNullValues,
  }) => {
    // Process the equipment details synchronously
    const processedEquipment = Object.keys(equipment).map((key) => {
      const values = excludeNullValues(equipment[key]);
      if (values) {
        return (
          <div key={key}>
            {values.split(",").map((value, idx) => (
              <div key={idx}>{value.trim()}</div>
            ))}
          </div>
        );
      }
      return null; // Return null if values is falsy
    });

    return <>{processedEquipment}</>;
  };

  const handleCheckboxChange = (id: string | number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleConfirmTransfer = () => {
    const selectedIds = Object.keys(selectedItems).filter(
      (id) => selectedItems[id],
    );

    // Filter the details of the selected items from the packageData
    const selectedDetails = packageData.filter((item) =>
      selectedIds.includes(item.itemId),
    );

    // Display the selected items' details in the form
    if (selectedDetails.length > 0) {
      setSelectedTransferDetails(selectedDetails); // Assuming this state is used to display the details in the form
      setFormVisible(true); // Trigger the form modal visibility
    } else {
      console.warn("No items selected for transfer.");
    }

    // Perform the async operation (e.g., update inventory) using .then() and .catch()
    fetch("/api/Transfer/updateIssuedTo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemIds: selectedIds,
        location: transferLocation,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update inventory");
        }
        return response.json(); // Return the response JSON to process further
      })
      .then((updatedInventory) => {
        console.log("Inventory updated:", updatedInventory);
      })
      .catch((error) => {
        console.error("Error saving edited data:", error);
      });
  };

  // Reset the state
  // setFormVisible(true);
  // setTransferMode(false);
  // setSelectedItems({});
  // setTransferLocation("");
  // setIsModalOpen(false);

  const handleCancelTransfer = () => {
    setTransferMode(false);
    setSelectedItems({});
    setFormVisible(false);

    setTransferLocation("");
    setIsModalOpen(false);
  };

  const handleDownloadAsImage = () => {
    const formElement = document.getElementById("transfer-form");

    if (formElement) {
      // Use html2canvas to create a canvas from the form element
      html2canvas(formElement)
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "transfer-details.png";
          link.href = canvas.toDataURL("image/png");
          link.click(); // Trigger the download

          const imageData = canvas.toDataURL("image/png").split(",")[1];

          // const response = await fetch("/api/notification");
          // const prisma = new PrismaClient();
          // const session = await auth();
          // const user = await prisma.user.findFirst({
          //   where: { id: session?.user.id },
          // });
          // const incharge = await prisma.user.findFirst({
          //   where: { location: user?.location },
          // });
          // const bhoomi: any = await prisma.notification.create({
          //   data: {
          //     userId: incharge?.govId || "",
          //     inchargeId: user?.govId || "",
          //     message: `The following items in link are transferred by ${user?.name} from govId ${incharge?.govId}  ${imageData}.`,
          //   },
          // });
          // await sendingEmail(incharge?.email as string, bhoomi.message);

          // const s3 = new AWS.S3({
          //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          //   region: process.env.AWS_REGION!,
          // });

          // const uploadToS3 = (base64Data: string, mimeType: string) => {
          //   const buffer = Buffer.from(base64Data, 'base64'); // Decode the base64 string to binary data

          //   const params = {
          //     Bucket: process.env.S3_BUCKET_NAME!,
          //     Key: `${Date.now()}_image.${mimeType.split('/')[1]}`, // Unique file name
          //     Body: buffer,
          //     ContentType: mimeType,
          //     ACL: 'public-read', // Make the file publicly accessible
          //   };

          //   return s3.upload(params).promise();
          // };

          // uploadToS3(imageData, MimeType);

          // Return the response from the S3 upload
          return NextResponse.json(
            { message: "file uploaded successfully" },
            { status: 200 },
          );
        })
        .catch((error) => {
          console.error(`Error uploading image: ${error}`);
          throw error;
        });
    }
  };

  /* API call not mandatory
      try {
        const response = await fetch(
          process.env.URL + "/api/contract2/addContract2Url",
          {
            method: "PUT",
            body: JSON.stringify(contract2Data),
          }
  
        );
        
  
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          return NextResponse.json({
            status: 200,
            body: result,
          });
        } else {
          return NextResponse.json({
            status: 500,
            body: {
              error: "Failed to update contract2",
            },
          });
        }
      } catch (err) {
        console.error(err);
        return NextResponse.json({
          status: 500,
          body: {
            error: "Failed to update contract2",
          },
        });
      }
        */

  // Decode stationId from URL params
  const stationId = params?.stationId
    ? decodeURIComponent(params.stationId as string)
    : null;

  const excludeNullValues = (obj: any) => {
    // Check if obj is null or not an object
    if (obj === null || typeof obj !== "object") {
      return ""; // Return an empty string or handle it as needed
    }

    let result = [];

    for (const [key, value] of Object.entries(obj)) {
      // Exclude null values and specific keys
      if (value !== null && key !== "id" && key !== "inventoryItemId") {
        result.push(`${key} = ${value}`);
      }
    }

    return result.join(", "); // Join the results with a comma and space
  };

  useEffect(() => {
    // Start the data fetch when the component mounts or when `stationId` changes
    const fetchData = () => {
      fetch(`/api/station/${stationId}`, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json(); // Process the JSON data if the response is ok
          } else {
            // If the response is not OK, return default data
            return defaultData;
          }
        })
        .then((data) => {
          // If data exists and has content, update the state with the fetched data
          if (data && data.length > 0) {
            setPackageData(data);
          } else {
            setPackageData(defaultData); // Set default data if no data is found
          }
        })
        .catch((error) => {
          // Handle errors during the fetch process
          setPackageData(defaultData);
          toast.error("Error searching the station", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after the fetch is complete
        });
    };

    // Call fetchData whenever stationId changes
    fetchData();
  }, [stationId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Package,
  ): void => {
    const { value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [field]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

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

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="VIEW INVENTORY ITEMS" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto text-center">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4 ">
                  {[
                    { name: "Item Id", minWidth: "120px" },
                    { name: "Category", minWidth: "120px" },
                    { name: "Type", minWidth: "150px" },
                    { name: "Quantity", minWidth: "120px" },
                    { name: "Location", minWidth: "150px" },
                    { name: "Condition", minWidth: "120px" },
                    { name: "Acquisition Date", minWidth: "120px" },
                    { name: "Expiry Date", minWidth: "120px" },
                    { name: "Price", minWidth: "120px" },
                    { name: "Supplier", minWidth: "120px" },
                    { name: "Return Date", minWidth: "120px" },
                    { name: "Last Inspection Date", minWidth: "120px" },
                    { name: "Maintenance Schedule", minWidth: "120px" },
                    { name: "Maintenance Charge", minWidth: "120px" },
                    { name: "Issued To", minWidth: "120px" },
                    { name: "User Id", minWidth: "120px" },
                    { name: "Category details", minWidth: "300px" },
                  ].map(({ name, minWidth }) => (
                    <th
                      key={name}
                      className={`min-w-[${minWidth}] px-4 py-4 font-medium text-black dark:text-white`}
                    >
                      {name}
                    </th>
                  ))}
                  {!transferMode && (
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {packageData.map((item, index) => (
                  <tr key={item.itemId}>
                    <td className=" p-1">{item.itemId}</td>
                    <td className=" p-1">{item.category}</td>
                    <td className=" p-1">{item.type}</td>
                    <td className=" p-1">{item.quantity}</td>
                    <td className=" p-1">{item.condition}</td>
                    <td className=" p-1">{item.location}</td>
                    <td className=" p-1">{item.acquisitionDate}</td>
                    <td className=" p-1">{item.expiryDate}</td>
                    <td className=" p-1">{item.price}</td>
                    <td className=" p-1">{item.supplier}</td>
                    <td className=" p-1">{item.returnDate}</td>
                    <td className=" p-1">{item.lastInspectionDate}</td>
                    <td className=" p-1">{item.maintenanceSchedule}</td>
                    <td className=" p-1">{item.maintenanceCharge}</td>
                    <td className=" p-1">{item.issuedTo}</td>
                    <td className=" p-1">{item.userId}</td>
                    <td className=" px-4 py-5 ">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="userId"
                          value={editedRow.userId || ""}
                          onChange={(e) => handleInputChange(e, "userId")}
                          className="border p-1"
                        />
                      ) : (
                        <EquipmentDetails
                          equipment={{
                            communicationDevice: item.communicationDevice,
                            computerAndITEquipment: item.computerAndITEquipment,
                            networkingEquipment: item.networkingEquipment,
                            surveillanceAndTracking:
                              item.surveillanceAndTracking,
                            vehicleAndAccessories: item.vehicleAndAccessories,
                            protectiveGear: item.protectiveGear,
                            firearm: item.firearm,
                            forensic: item.forensic,
                            medicalFirstAid: item.medicalFirstAid,
                            officeSupply: item.officeSupply,
                          }}
                          excludeNullValues={excludeNullValues}
                        />
                      )}
                    </td>
                    {transferMode ? (
                      <td className=" p-2">
                        <input
                          type="checkbox"
                          checked={selectedItems[item.itemId] || false}
                          onChange={() => handleCheckboxChange(item.itemId)}
                        />
                      </td>
                    ) : (
                      <td className="border p-2">
                        <button
                          onClick={handleTransferClick}
                          className="rounded bg-blue-500 p-2 text-white"
                        >
                          Transfer
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {transferMode && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded bg-green-500 p-2 text-white"
            >
              Transfer Selected Items
            </button>
            <button
              onClick={handleCancelTransfer}
              className="ml-2 rounded bg-gray-500 p-2 text-white"
            >
              Cancel
            </button>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="rounded bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl">Enter Transfer Location</h3>
              <div>
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Location (Police Station)
                </label>
                <select
                  value={transferLocation}
                  onChange={(e) => setTransferLocation(e.target.value)}
                >
                  <option value="" disabled>
                    Select a police station
                  </option>
                  {policeStations.map((station) => (
                    <option key={station.name} value={station.name}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleConfirmTransfer}
                  className={`rounded bg-blue-500 p-2 text-white ${transferLocation === "" ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={transferLocation === ""}
                >
                  Confirm Transfer
                </button>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 rounded bg-gray-500 p-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {formVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div
              id="transfer-form"
              className="w-full max-w-3xl rounded bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-bold">Transfer Details</h3>
              <p className="mb-2">Location: {transferLocation}</p>
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Item ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Category
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDetails.map((item) => (
                    <tr key={item.itemId}>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.itemId}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.category}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleDownloadAsImage}
                  className="rounded bg-green-500 p-2 text-white"
                >
                  Download as Image
                </button>
                <button
                  onClick={() => setFormVisible(false)}
                  className="ml-2 rounded bg-gray-500 p-2 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInventoryIndividual;
