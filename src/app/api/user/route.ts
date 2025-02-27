// app/api/user/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db";
import { user, session } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session_token")?.value || 
                         req.headers.get("Authorization")?.replace("Bearer ", "");
    
    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const activeSession = await db
      .select()
      .from(session)
      .where(eq(session.token, sessionToken))
      .limit(1);
    
    if (!activeSession || activeSession.length === 0 || new Date(activeSession[0].expiresAt) < new Date()) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const userData = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      })
      .from(user)
      .where(eq(user.id, activeSession[0].userId))
      .limit(1);

    if (!userData || userData.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData[0]);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}