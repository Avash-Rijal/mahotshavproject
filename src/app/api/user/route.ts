import { db } from "@/app/db";
import { user } from "auth-schema";

import { eq } from "drizzle-orm";
import { auth } from "lib/auth";

export async function GET(req: Request) {
    try {
        // Make sure all headers are being correctly passed to the auth API
        const headers = Object.fromEntries(req.headers.entries());
        console.log("Request headers:", headers);
        
        const sessionResponse = await auth.api.getSession(req);

        if (!sessionResponse) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Rest of your code remains the same
        const userId = sessionResponse.user.id;
        // ...
    } catch (error) {
        console.error("GET /api/user error:", error);
        return new Response(JSON.stringify({ 
            error: error.message || "Internal Server Error",
            details: error.toString()
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function PUT(req: Request) {
    const sessionResponse = await auth.api.getSession(req);

    if (!sessionResponse) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const userId = sessionResponse.user.id;

    try {
        const body = await req.json();
        const { name, image } = body;
        
        // Create an update object with only valid fields
        const updateData: any = { 
            updatedAt: new Date() 
        };
        
        // Only add fields that are provided in the request
        if (name !== undefined) {
            updateData.name = name;
        }
        
        if (image !== undefined) {
            updateData.image = image;
        }

        await db
            .update(user)
            .set(updateData)
            .where(eq(user.id, userId));

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }
}
