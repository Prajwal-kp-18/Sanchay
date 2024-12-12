"use client";

import React, { useState } from "react";
import Joyride, { CallBackProps, Step } from "react-joyride";

const TourGuide: React.FC = () => {
  const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: "body",
      content: "Welcome to SurakshaSanchay!",
      placement: "center",
      disableBeacon: true, // Ensures the tour starts immediately
    },
    {
      target: "#dashboard",
      content: "This is the Dashboard. It gives you an overview of activities.",
    },
    {
      target: "#manage-inventory",
      content:
        "This is Manage Inventory. You can add or edit items in the inventory.",
    },
    {
      target: "#search-police-station",
      content:
        "This is Search Police Station. You can see all police stations in our database.",
    },
    {
      target: "#request-management",
      content:
        "This is Request Management. You can accept or deny requests here.",
    },
    {
      target: "#reports-audits",
      content:
        "This is Reports/Audits. You can view monthly reports or download station audits.",
    },
    {
      target: "#qr-code",
      content:
        "This is QR Code. You can generate QR codes for items or scan existing item QRs.",
    },
    {
      target: "#budget-forecast",
      content:
        "This is Budget Forecast. Use it to estimate future budgets effectively.",
    },
    {
      target: "#authentication",
      content: "This is Authentication. Add new users to the database here.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      setRun(false); // Stops the tour when finished or skipped
    }
  };

  return (
    <div>
      <Joyride
        steps={steps}
        run={run} // Controls whether the tour is running
        continuous // Automatically moves to the next step
        scrollToFirstStep // Ensures the first step is visible
        showProgress // Displays a progress indicator
        showSkipButton // Displays a skip button
        callback={handleJoyrideCallback} // Handles tour events
        styles={{
          options: {
            zIndex: 10000, // Ensures the tour appears above all UI elements
            arrowColor: "#fff",
            backgroundColor: "#007bff",
            textColor: "#fff",
            overlayColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      />
    </div>
  );
};

export default TourGuide;
