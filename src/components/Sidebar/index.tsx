"use client";
// import React, { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

import React, { useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  // setSidebarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const menuGroups = [
  {
    
    name: "INVENTORY INCHARGE DASHBOARD",
    menuItems: [
      {
        id:"dashboard",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z"
              fill=""
            />
            <path
              d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z"
              fill=""
            />
            <path
              d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z"
              fill=""
            />
            <path
              d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z"
              fill=""
            />
          </svg>
        ),
        label: "Dashboard",
        route: "/settings",
        // label: "
      },

      {
        id:"profile",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
              fill=""
            />
            <path
              d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
              fill=""
            />
          </svg>
        ),
        label: "Profile",
        route: "/profile",
      },
      {
        id:"penalty",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
              fill=""
            />
            <path
              d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
              fill=""
            />
          </svg>
        ),
        label: "Penalty and Awards",
        route: "/penaltyAward",
      },
      {
        id:"manage-inventory",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
              fill=""
            />
            <path
              d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
              fill=""
            />
            <path
              d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
              fill=""
            />
            <path
              d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
              fill=""
            />
            <path
              d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
              fill="white"
            />
          </svg>
        ),
        label: "Manage Inventory ",
        route: "#",
        children: [
          { label: "Add Inventory Item", route: "/forms/addInventory" },
          { label: "View Local Inventory", route: "/forms/viewInventory" },
        ],
      },
      {
        id:"user-interaction",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9807)">
              <path
                d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V7.53335C0.506348 8.4896 1.29385 9.2771 2.2501 9.2771H15.7501C16.7063 9.2771 17.4938 8.4896 17.4938 7.53335V2.3021C17.4938 1.34585 16.7063 0.55835 15.7501 0.55835ZM16.2563 7.53335C16.2563 7.8146 16.0313 8.0396 15.7501 8.0396H2.2501C1.96885 8.0396 1.74385 7.8146 1.74385 7.53335V2.3021C1.74385 2.02085 1.96885 1.79585 2.2501 1.79585H15.7501C16.0313 1.79585 16.2563 2.02085 16.2563 2.3021V7.53335Z"
                fill=""
              />
              <path
                d="M6.13135 10.9646H2.2501C1.29385 10.9646 0.506348 11.7521 0.506348 12.7083V15.8021C0.506348 16.7583 1.29385 17.5458 2.2501 17.5458H6.13135C7.0876 17.5458 7.8751 16.7583 7.8751 15.8021V12.7083C7.90322 11.7521 7.11572 10.9646 6.13135 10.9646ZM6.6376 15.8021C6.6376 16.0833 6.4126 16.3083 6.13135 16.3083H2.2501C1.96885 16.3083 1.74385 16.0833 1.74385 15.8021V12.7083C1.74385 12.4271 1.96885 12.2021 2.2501 12.2021H6.13135C6.4126 12.2021 6.6376 12.4271 6.6376 12.7083V15.8021Z"
                fill=""
              />
              <path
                d="M15.75 10.9646H11.8688C10.9125 10.9646 10.125 11.7521 10.125 12.7083V15.8021C10.125 16.7583 10.9125 17.5458 11.8688 17.5458H15.75C16.7063 17.5458 17.4938 16.7583 17.4938 15.8021V12.7083C17.4938 11.7521 16.7063 10.9646 15.75 10.9646ZM16.2562 15.8021C16.2562 16.0833 16.0312 16.3083 15.75 16.3083H11.8688C11.5875 16.3083 11.3625 16.0833 11.3625 15.8021V12.7083C11.3625 12.4271 11.5875 12.2021 11.8688 12.2021H15.75C16.0312 12.2021 16.2562 12.4271 16.2562 12.7083V15.8021Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9807">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "User Interaction",
        route: "#",
        children: [
          { label: "Issue Item to User", route: "/forms/issueInventoryItem" },
          { label: "Record Item Return", route: "/forms/recordItemReturn" },
          {
            label: "Accept User Maintenance Request",
            route: "/forms/acceptMaintenanceRequest",
          },
        ],
      },
      {
        id:"requests",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="3"
              cy="4"
              r="1.5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />

            <line
              x1="6"
              y1="4"
              x2="16"
              y2="4"
              stroke="currentColor"
              stroke-width="1.5"
            />

            <circle
              cx="3"
              cy="9"
              r="1.5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />

            <line
              x1="6"
              y1="9"
              x2="16"
              y2="9"
              stroke="currentColor"
              stroke-width="1.5"
            />

            <circle
              cx="3"
              cy="14"
              r="1.5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />

            <line
              x1="6"
              y1="14"
              x2="16"
              y2="14"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        ),
        label: "Requests",
        route: "#",
        children: [
          { label: "New Item Request", route: "/userPages/issueItemForm" },
          // { label: "Maintenance Request", route: "/userPages/userMaintenanceForm" },
          // { label: "Discard Item Request", route: "/forms/discardForm" },
        ],
      },
      {
        id:"report-audit",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 2H18C18.553 2 19 2.447 19 3V21C19 21.553 18.553 22 18 22H6C5.447 22 5 21.553 5 21V3C5 2.447 5.447 2 6 2Z" />
              <path d="M19 3L12 9.3L5 3" />
              <path d="M10 14H14" />
              <path d="M10 18H14" />
            </svg>

            <defs>
              <clipPath id="clip0_130_9801">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Reports & Audits",
        route: "#",
        children: [
          { label: "View Reports", route: "/report/admin" },
          { label: "Fill Audit Form", route: "/report/auditForm" },
          { label: "Audit Logs", route: "/report/audit" },
        ],
      },

      {
        id:"notification",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="3"
              width="16"
              height="12"
              rx="2"
              ry="2"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />
            <path
              d="M1 4l8 5 8-5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />
          </svg>
        ),
        label: "Notifications",
        route: "/forms/notification",
      },

      {
        id:"budget-forecast",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9801)">
              <path
                d="M10.8563 0.55835C10.5188 0.55835 10.2095 0.8396 10.2095 1.20522V6.83022C10.2095 7.16773 10.4907 7.4771 10.8563 7.4771H16.8751C17.0438 7.4771 17.2126 7.39272 17.3251 7.28022C17.4376 7.1396 17.4938 6.97085 17.4938 6.8021C17.2688 3.28647 14.3438 0.55835 10.8563 0.55835ZM11.4751 6.15522V1.8521C13.8095 2.13335 15.6938 3.8771 16.1438 6.18335H11.4751V6.15522Z"
                fill=""
              />
              <path
                d="M15.3845 8.7427H9.1126V2.69582C9.1126 2.35832 8.83135 2.07707 8.49385 2.07707C8.40947 2.07707 8.3251 2.07707 8.24072 2.07707C3.96572 2.04895 0.506348 5.53645 0.506348 9.81145C0.506348 14.0864 3.99385 17.5739 8.26885 17.5739C12.5438 17.5739 16.0313 14.0864 16.0313 9.81145C16.0313 9.6427 16.0313 9.47395 16.0032 9.33332C16.0032 8.99582 15.722 8.7427 15.3845 8.7427ZM8.26885 16.3083C4.66885 16.3083 1.77197 13.4114 1.77197 9.81145C1.77197 6.3802 4.47197 3.53957 7.8751 3.3427V9.36145C7.8751 9.69895 8.15635 10.0083 8.52197 10.0083H14.7938C14.6813 13.4958 11.7845 16.3083 8.26885 16.3083Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9801">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Budget Forecast",
        route: "/Ml",
      },
      {
        id:"qr-code",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 2H18C18.553 2 19 2.447 19 3V21C19 21.553 18.553 22 18 22H6C5.447 22 5 21.553 5 21V3C5 2.447 5.447 2 6 2Z" />
              <path d="M19 3L12 9.3L5 3" />
              <path d="M10 14H14" />
              <path d="M10 18H14" />
            </svg>

            <defs>
              <clipPath id="clip0_130_9801">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "QR Code",
        route: "#",
        children: [
          { label: "Generate QR Code", route: "/qrGenerate" },
          { label: "Scan QR Code", route: "/scanQR" },
          { label: "Asset Tracking", route: "/forms/assetList" },
        ],
      },
      {
        id:"asset-tracking",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="9"
              width="16"
              height="14"
              rx="2"
              ry="2"
              fill="none"
              stroke="white"
            ></rect>

            <path
              d="M7 12l3 3l7-7"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>

            <circle cx="12" cy="5" r="2.5" fill="none" stroke="white"></circle>
            <path
              d="M12 1v1m0 8v1m4-4h1M9 6H8"
              fill="none"
              stroke="white"
              stroke-width="2"
            ></path>
          </svg>
        ),
        label: "Assest Tracking",
        route: "/forms/assetTracking",
      },

      {
        id:"authentication",
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9814)">
              <path
                d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                fill=""
              />
              <path
                d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9814">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Authentication",
        route: "#",
        children: [{ label: "  Register User", route: "/registerUser" }],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  // Define the tour steps
  const tourSteps: Step[] = [
    {
      target: "body",
      content: "Welcome to SurakshaSanchany!",
      placement: "center",
    },
    
    {
      target: "#dashboard",
      content: "This is the dashboard. It gives an overview.",
    },
    {
      target: "#profile",
      content: "This is the Profile. It allows you to edit your profile.",
    },
    {
      target:"#penalty",
      content:"This is penaly and Awards.It allows you to log penalty or log award.",
    },
    {
      target: "#manage-inventory",
      content: "This is Manage Inventory. You can add or edit items here.",
    },
    {
      target: "#user-interaction",
      content: "This is User Interaction.Here you can Issue/Record items and accept maintenance requests.",
    },
    
    
    {
      target: "#requests",
      content: "This is Requests. Here we can apply new item requests .",
    },
    {
      target: "#report-audit",
      content:
        "This is Reports & Audits. View/Fill monthly reports.",
    },
    {
      target:"#notification",
      content:"This is Notifications.View different notifications."
    },

    {
      target: "#budget-forecast",
      content: "This is Budget Forecast. Estimate future budgets here.",
    },
    {
      target: "#qr-code",
      content: "This is QR Code. Generate or scan QR codes for items.",
    },
    {
      target:"#asset-tracking",
      content:"This is asset tracking.Add or update locations for items using."
    },
    {
      target: "#authentication",
      content: "This is Authentication. Add new users to the database here.",
    },
  ];

  // Handle tour callback (optional)
  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      console.log("Tour finished or skipped");
    }
  };

  return (
    <>
      {/* Add the Joyride component */}
      <Joyride
        steps={tourSteps}
        callback={handleTourCallback}
        continuous
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          {/* <Link href="/">
            <Image
              width={176}
              height={32}
              src={"/images/logo/logo.svg"}
              alt="Logo"
              priority
            />
          </Link> */}
          <h2 className="text-title-md2 font-semibold text-white">
            SurakshaSanchay
          </h2>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 115.88 105.69"
            style={{ width: "auto", height: "2.5em", fill: "white" }}
            enableBackground="new 0 0 122.88 105.69"
          >
            <style type="text/css">{`
      .st0 {
        fill-rule:evenodd;
        clip-rule:evenodd;
      }
    `}</style>
            <g>
              <path
                className="st0"
                d="M61.44,24.71c-10.31,0.23-20.99,1.19-29.91,3.02l-0.01-0.04C27.45,8.51,44.29-0.03,61.44,0 c17.15-0.03,34,8.51,29.92,27.7l-0.01,0.04C82.43,25.9,71.75,24.95,61.44,24.71L61.44,24.71z M60.82,9.41l1.6,3.92l4.23,0.31 l-3.23,2.74l1.01,4.12l-3.6-2.23l-3.6,2.23l1.01-4.12l-3.23-2.74l4.23-0.31L60.82,9.41L60.82,9.41z M17.55,92.4h16.11 c0.38,0,0.69,0.31,0.69,0.69v3.72c0,0.38-0.31,0.69-0.69,0.69H17.55c-0.38,0-0.69-0.31-0.69-0.69v-3.72 C16.86,92.71,17.17,92.4,17.55,92.4L17.55,92.4L17.55,92.4z M73.53,64.48c-4.3,2.87-6.93,4.45-12.5,4.31 c-5.42-0.08-8.25-1.91-12.58-4.65C48.12,82.23,73.98,83.3,73.53,64.48L73.53,64.48z M79.98,51.36c0.23-0.8,0.5-1.64,0.8-2.63 c0.11-0.42,0.53-0.72,0.95-0.65c1.26,0.23,2.52-1.6,3.39-3.81c0.5-1.33,0.88-2.78,0.99-4.08c0.12-1.22,0-2.29-0.34-2.94 c-0.34-0.63-1.28-0.26-1.98-0.88c-3.61,9.58-35.12,13.92-48.01,0.72c-0.46,0.73-0.53,2.02-0.38,3.47c0.19,1.53,0.65,3.2,1.34,4.54 c0.8,1.56,1.83,2.63,2.86,2.36c0.42-0.11,0.88,0.11,1.03,0.53c0.3,0.84,0.5,1.49,0.72,2.14C48.04,69.75,73.43,71.29,79.98,51.36 L79.98,51.36L79.98,51.36z M122.88,105.69l-0.72-2.76c-8.2-36.03-27.92-21.7-45-33.68c-0.26-0.23-0.52-0.46-0.77-0.7l-0.21-4.88 c3.09-3.23,6.63-9.1,8.06-13.38c1.77,0,3.29-1.48,4.36-3.58c0.82-1.64,1.4-3.62,1.6-5.51c0.21-1.93,0.04-3.74-0.66-4.89l0.91-4.36 c-8.62-1.78-18.99-2.71-29.03-2.94c-10.03,0.23-20.4,1.16-29.03,2.94l0.91,4.36c-0.7,1.15-0.86,2.96-0.66,4.89 c0.21,1.89,0.78,3.87,1.6,5.51c1.07,2.1,2.59,3.58,4.36,3.58c0.16,0.49,0.37,1.03,0.54,1.56c1.97,5.24,3.51,8.35,7.53,12.13 l-0.21,4.56c-0.25,0.24-0.5,0.47-0.77,0.7c-17.08,11.98-36.8-2.35-45,33.68L0,105.69H122.88L122.88,105.69z"
              />
            </g>
          </svg>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
    </>
  );
};

export default Sidebar;
