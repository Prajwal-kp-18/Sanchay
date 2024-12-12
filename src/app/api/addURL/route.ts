

import { redirect } from "next/dist/server/api-utils";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(request: Request) {
  // Handle PATCH requests to update a contract

  if (request.method === "PUT") {
    const req = await request.json();
 
    const location = req.location;
    const id = req.id;

    const auditurl = req.auditurl;


    try {

      const result = await prisma.reportLogs.update({
        where: {
            id: id,
        }, 
        data: {
            auditurl: auditurl,
        }
      })

      return NextResponse.json(
        { message: "URL updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { message: "Error updating contract", error: err?.message },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Invalid request method",
        error: "Only PUT requests are allowed",
      },
      { status: 405 }
    );
  }
}