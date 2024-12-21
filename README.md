# SurakshaSanchay: Police Hardware Inventory Management System

## Repository URL

---

## Project Overview
SurakshaSanchay is a comprehensive hardware inventory management system designed to address the challenges faced by police departments in managing technological assets. This project aims to ensure that all technological assets, such as computers, communication devices, servers, and other equipment, are readily available, well-maintained, and up-to-date.

### Key Objectives
1. **Operational Efficiency:** Improve the police department's operational readiness by ensuring the availability and functionality of hardware resources.
2. **Centralized Management:** Provide a unified platform to manage inventory across multiple locations.
3. **Real-Time Insights:** Enable accurate tracking, usage monitoring, and reporting for better decision-making.
4. **Cost Optimization:** Minimize operational costs by improving asset utilization and reducing unnecessary purchases.

---

## Issues Addressed

### 1. Lack of Centralized System
- Inefficient tracking of hardware assets across various locations.
- Solution: A centralized platform with real-time updates.

### 2. Inaccurate Inventory Records
- Outdated or missing records due to manual processes.
- Solution: Automated data entry and regular audits.

### 3. Inefficient Allocation and Utilization
- Resource misallocation and underutilization of assets.
- Solution: Dynamic allocation and utilization monitoring.

### 4. Maintenance Challenges
- Delayed maintenance and lifecycle tracking of hardware.
- Solution: Preventive maintenance schedules and lifecycle management.

### 5. Compliance and Security Risks
- Non-compliance and security vulnerabilities.
- Solution: Regulatory tracking and secure asset management.

### 6. Cost Management
- Increased costs due to inefficiencies.
- Solution: Cost analysis and informed budgeting.

---

## Features

### Centralized Management
- Real-time inventory tracking with automated updates.
- Support for barcode scanning and RFID tracking.

### Reports and Audits
- Detailed usage reports and audit logs.
- Visual data representation using ApexCharts.

### Lifecycle and Maintenance
- Scheduled maintenance notifications.
- Lifecycle tracking for timely hardware upgrades.

### User Management
- Role-based access control for secure operations.
- User-friendly dashboard for quick navigation.

### Compliance and Security
- Adherence to regulatory requirements.
- Security protocols to prevent unauthorized access.

---

## Installation and Setup

### Prerequisites
1. **Next.js** - Ensure Nextjs.js is installed.
2. **Database** - Use Postgresql and prisma(ORM) for data storage.
3. **Package Manager** - Use `npm` or `yarn` to install dependencies.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/BhoomiAgrawal12/SurakshaSanchay
   ```
### Navigate to the project directory:
```bash
cd SurakshaSanchay
```
### install dependencies:
```bash
npm install
```
### Set up environment variables:
### Create a .env file in the root directory.
### Add the following variables:
DATABASE_URL=your_database_url
AUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
DOMAIN=your_website_url
RESEND_API_KEY=your_email_resend_key

### Start the development server:
npm run dev
### API Endpoints

### Authentication
POST /api/auth/login - User login.
POST /api/auth/register - User registration.

### Inventory Management
GET /api/inventory - Fetch all inventory items.
POST /api/inventory - Add a new inventory item.
PUT /api/inventory/:id - Update an inventory item.
DELETE /api/inventory/:id - Delete an inventory item.

### Reports
GET /api/reports - View reports.
POST /api/reports - Generate a new report.

### Technology Stack

### Frontend

Framework: Next.js
Styling: Tailwind CSS
Data Visualization: ApexCharts

### Backend

Database: Postgresql with Prisma
Authentication: NextAuth.js

### Deployment

Platform: Vercel
Storage: AWS S3 for file uploads

### How to Contribute

1. Fork the repository:

2. clone your forked repository
git clone <your-forked-repo-url>

3. Create a feature branch:
git checkout -b feature/your-feature-name

4. Commit changes:
git commit -m "Description of your changes"

5. Push the branch to your fork repo:
git push origin feature/your-feature-name

6. Open a pull request to the main repository.

License
The project is licensed under the MIT License.  
