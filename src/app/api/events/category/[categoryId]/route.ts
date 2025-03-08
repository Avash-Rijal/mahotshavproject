import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db";
import { events } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const categoryId = url.pathname.split("/").pop(); // Extract categoryId from the URL

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
    }

    const categoryEvents = await db
      .select({
        id: events.id,
        name: events.name,
        startDate: events.startDate,
        venue: events.venueName,
        eventCity: events.city,
        price: events.ticketPrice,
        entryType: events.entryType,
      })
      .from(events)
      .where(eq(events.category, categoryId));

    return NextResponse.json(categoryEvents);
  } catch (error) {
    console.error("Error fetching events by category:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
