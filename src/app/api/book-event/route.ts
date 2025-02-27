// File: app/api/book-event/route.ts
import { db } from "@/app/db";
import { participants } from "@/app/drizzle/schema";
import { z } from "zod";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const participantSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  ticketId: z.string().or(z.array(z.string())),
  ticketPrice: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Body:", body);

    // Convert ticketId to array if it's a string
    let ticketIdArray = Array.isArray(body.ticketId) ? body.ticketId : [body.ticketId];
    body.ticketId = ticketIdArray;

    const parsedData = participantSchema.safeParse(body);

    if (!parsedData.success) {
      console.error("Validation Error:", parsedData.error.format());
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { eventId, ticketId, ticketPrice } = parsedData.data;

    await db.insert(participants).values({
      id: randomUUID(),
      eventId: eventId,
      eventTicket: Array.isArray(ticketId) ? ticketId : [ticketId],
      revenue: ticketPrice || "0",
    });

    return NextResponse.json(
      { message: "Booking successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error booking event:", error);
    return NextResponse.json({ error: "Failed to book event" }, { status: 500 });
  }
}