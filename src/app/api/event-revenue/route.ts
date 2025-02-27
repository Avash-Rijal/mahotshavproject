import { db } from "@/app/db";
import { events, participants } from "@/app/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const revenueData = await db
      .select({
        eventId: events.id,
        eventName: events.name,
        category: events.category,
        totalRevenue: sql`COALESCE(SUM(CAST(${participants.revenue} AS DECIMAL)), 0)`.as('total_revenue')
      })
      .from(events)
      .leftJoin(participants, eq(events.id, participants.eventId))
      .groupBy(events.id, events.name, events.category)
      .orderBy(events.name);
    
    return NextResponse.json(revenueData, { status: 200 });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json({ error: "Failed to fetch revenue data" }, { status: 500 });
  }
}