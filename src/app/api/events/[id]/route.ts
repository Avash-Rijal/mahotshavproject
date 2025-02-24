import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { events } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const data = await db
      .select({
        id: events.id,
        name: events.name,
        category: events.category,
        venue: events.venueName,
        price: events.ticketPrice,
        startTime: events.startTime,
        endTime: events.endTime,
        startDate: events.startDate,
        endDate: events.endDate,
        eventCity: events.city,
        participants: events.expectedParticipants,
        guests: events.guestList,
        entryType: events.entryType,
        description: events.description,
      })
      .from(events)
      .where(eq(events.id, id));

    const event = data[0];

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (data.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const updatedData = await req.json();

    const result = await db
      .update(events)
      .set({
        name: updatedData.eventName,
        category: updatedData.eventCategory,
        city: updatedData.eventCity,
        venueName: updatedData.venueName,
        startTime: updatedData.startTime,
        endTime: updatedData.endTime,
        startDate: updatedData.startDate,
        endDate: updatedData.endDate,
        ticketPrice: updatedData.ticketPrice,
        guestList: updatedData.guestList,
        participants: updatedData.participants,
        entryType: updatedData.entryType,
        description: updatedData.description,
      })
      .where(eq(events.id, id));

    if (result.count === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

