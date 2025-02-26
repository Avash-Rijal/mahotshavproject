import { db } from "@/app/db";
import { participants } from "@/app/drizzle/schema";
import { z } from "zod";
import { NextResponse } from "next/server";

const participantSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  ticketId: z.array(z.string()),
  revenue: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Body:", body);

    if (typeof body.ticketId === "string") {
      body.ticketId = [body.ticketId];
    }

    const parsedData = participantSchema.safeParse(body);

    if (!parsedData.success) {
      console.error("Validation Error:", parsedData.error.format());
      return NextResponse.json(
        { error: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { eventId, ticketId, revenue } = parsedData.data;

    await db.insert(participants).values({
      eventId,
      eventTicket: ticketId,
      revenue,
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

