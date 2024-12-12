import React from "react";
import CardElement from "./toloc";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
const sampleData = [
  { itemId: "001", type: "Laptop", category: "COMPUTER_AND_IT_EQUIPMENT", location: "TT Nagar Police Station" },
  { itemId: "002", type: "Pistol", category: "FIREARMS", location: "Kamla Nagar Police Station" },
  { itemId: "003", type: "Router", category: "NETWORKING_EQUIPMENT", location: "Shyamla Hills Police Station" },
];

const App: React.FC = () => {
  
  return (
  <><Breadcrumb pageName="TRANSFER DETAILS" /> 
    <CardElement data={sampleData} /> 
    </>
  )  
};

export default App;