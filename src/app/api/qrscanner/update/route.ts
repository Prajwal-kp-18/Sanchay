import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";

const prisma = new PrismaClient();

const domain = process.env.DOMAIN;
export async function PUT(req: Request) {
  try {
    const session = await auth();
    const user = session?.user;
    const location = await db.user.findUnique({
      where: { id: user?.id },
      select: { location: true },
    });

    const { itemId, condition, temporaryLocation } = await req.json();

    if (!itemId || (!location && !temporaryLocation)) {
      return NextResponse.json(
        { message: "Item ID and location/temporary location are required" },
        { status: 400 },
      );
    }

    // Fetch item
    const existingItem = await prisma.inventoryItem.findUnique({
      where: { itemId: itemId },
    });

    if (!existingItem) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Role-based logic
    let updatedItem;
    if (user?.role === "incharge") {
      updatedItem = await prisma.inventoryItem.update({
        where: { itemId: itemId },
        data: {
          location: location?.location,
          condition, // inventory-incharge can modify isDamaged
        },
      });
    } else if (user?.role === "user") {
      // Users can update the temporary location but not isDamaged
      if (!temporaryLocation) {
        return NextResponse.json(
          { message: "Temporary location is required" },
          { status: 400 },
        );
      }
      updatedItem = await prisma.inventoryItem.update({
        where: { itemId: itemId },
        data: {
          temporaryLocation: temporaryLocation, // Users can only modify the temporary location
        },
      });
      try {
        const response = await fetch('${domain}/api/asset/item-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: itemId,
            temporaryLocation: temporaryLocation,
          }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          return NextResponse.json({ message: errorData.message || 'Failed to create item location' }, { status: response.status });
        }
    
        const locationData = await response.json();
        // Optionally, you can handle the response from the item-location route here
    
      } catch (error:any) {
        return NextResponse.json({ message: 'Error occurred while creating item location', error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
