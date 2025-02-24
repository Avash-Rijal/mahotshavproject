import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { events } from "@/app/drizzle/schema";
import { z } from "zod";
import { randomUUID } from "crypto";

const eventSchema = z.object({
  eventName: z.string().min(1, "Name is required"),
  startTime: z.string(),
  endTime: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  eventCity: z.string().min(1, "City is required"),
  venueName: z.string().min(1, "Venue name is required"),
  participants: z.number().min(1, "Expected participants required"),
  guestList: z.array(z.string()).optional(),
  entryType: z.string().min(1, "Entry type is required"),
  ticketPrice: z.string().optional(),
  description: z.string().optional(),
  bannerImage: z.any().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = eventSchema.parse(body);

    const startTime = new Date(validatedData.startTime);
    const endTime = new Date(validatedData.endTime);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new Error("Invalid time format");
    }

    const user = await db.query.user.findFirst();
    if (!user) {
      throw new Error("No users found in the database.");
    }

    await db.insert(events).values({
      id: randomUUID(),
      name: validatedData.eventName,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      startDate: validatedData.startDate,
      endDate: validatedData.endDate, 
      city: validatedData.eventCity,
      venueName: validatedData.venueName,
      expectedParticipants: validatedData.participants.toString(), // Fixed this line
      guestList: validatedData.guestList || [],
      entryType: validatedData.entryType,
      ticketPrice: validatedData.ticketPrice || "0",
      description: validatedData.description || "",
      createdBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Event created successfully!",
    });
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 400 }
    );
  }
}
