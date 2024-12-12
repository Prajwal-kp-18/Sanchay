import { AuditReport, Policy, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    
    const body = await req.json(); // Parse request body

    console.log(body);
    const {
        auditDetails,
        policies,
        stockValuationAccuracy,
    } = body;

    const session = await auth();
    const userId = session?.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    const admin = await prisma.user.findFirst({
      where: { role: "admin" },
    });


    if (!user || user.role !== "incharge") {
      return NextResponse.json(
        { success: false, message: "Permission denied!" },
        { status: 403 },
      );
    }

    const Policiesid: any= [];
    const Policies: Policy[] = [];
        const spolicy: Policy = await prisma.policy.create({
            data: {
                name: "STORAGE_POLICY",
                findings: policies.storagePolicy.findings,
                impact: policies.storagePolicy.impact,
                recommendation: policies.storagePolicy.recommendation,
                complianceStatus: policies.storagePolicy.complianceStatus,
                compliancePercentage: policies.storagePolicy.compliancePercentage,
            }
        });
        const prpolicy: Policy = await prisma.policy.create({
            data: {
                name: "PROCUREMENT_POLICY",
                findings: policies.procurementPolicy.findings,
                impact: policies.procurementPolicy.impact,
                recommendation: policies.procurementPolicy.recommendation,
                complianceStatus: policies.procurementPolicy.complianceStatus,
                compliancePercentage: policies.procurementPolicy.compliancePercentage,
            }
        });
        const upolicy: Policy = await prisma.policy.create({
            data: {
                name: "USAGE_AND_DEPLOYMENT_POLICY",
                findings: policies.usageDeploymentPolicy.findings,
                impact: policies.usageDeploymentPolicy.impact,
                recommendation: policies.usageDeploymentPolicy.recommendation,
                complianceStatus: policies.usageDeploymentPolicy.complianceStatus,
                compliancePercentage: policies.usageDeploymentPolicy.compliancePercentage,
            }
        });
        const dpolicy: Policy = await prisma.policy.create({
            data: {
                name: "DISPOSAL_POLICY",
                findings: policies.disposalPolicy.findings,
                impact: policies.disposalPolicy.impact,
                recommendation: policies.disposalPolicy.recommendation,
                complianceStatus: policies.disposalPolicy.complianceStatus,
                compliancePercentage: policies.disposalPolicy.compliancePercentage,
            }
        });
        const ppolicy: Policy = await prisma.policy.create({
            data: {
                name: "PURCHASE_POLICY",
                findings: policies.purchasePolicy.findings,
                impact: policies.purchasePolicy.impact,
                recommendation: policies.purchasePolicy.recommendation,
                complianceStatus: policies.purchasePolicy.complianceStatus,
                compliancePercentage: policies.purchasePolicy.compliancePercentage,
            }
        });

        Policies.push(spolicy, prpolicy, upolicy, dpolicy, ppolicy)

        Policiesid.push(spolicy.id, prpolicy.id, upolicy.id, dpolicy.id, ppolicy.id);


        const StockAccuracy: any = await prisma.stock.create(
            {
                data: {
                    specializedEquipment: policies.stockValuationAccuracy?.specializedEquipment|| 0,
                    operationalAssets: policies.stockValuationAccuracy?.operationalAssets || 7,
                    governmentFundedItems: policies.stockValuationAccuracy?.governmentFundedItems || 5,
                }}
        )

    const{StocksAccuracy, id} = StockAccuracy;


    const request = await prisma.auditReport.create({
      data: {
        auditOfficerName: auditDetails.auditOfficerName,
        auditOfficerId: auditDetails.auditOfficerId,
        location: auditDetails.location,
        startDate: new Date(auditDetails.startDate),
        endDate: new Date(auditDetails.endDate),
        Policiesid,
        StockAccuracy: StocksAccuracy,
        StockId: StockAccuracy.id,
        
      },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Error submitting Audit Details:", error);
    return NextResponse.json(
      { error: "Failed to submit Audit Details" },
      { status: 500 },
    );
  }
}
