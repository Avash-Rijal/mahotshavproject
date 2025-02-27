// File: app/(website)/categories/[categoryId]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/app/db";
import { events } from "@/app/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function CategoryPage({ params }) {
  const categoryId = await params.categoryId;
  
  const getCategoryInfo = (id) => {
    const categories = {
      music: { name: "Music", description: "Music events and concerts" },
      art: { name: "Art", description: "Art exhibitions and galleries" },
      culture: { name: "Cultural", description: "Cultural festivals and events" },
      sports: { name: "Sports", description: "Sports events and competitions" },
      workshops: { name: "Workshops", description: "Educational workshops and classes" },
      business: { name: "Business", description: "Business conferences and networking" },
      health: { name: "Health", description: "Health and wellness events" },
      wedding: { name: "Wedding", description: "Wedding planning and expos" },
    };
    
    return categories[id] || null;
  };
  
  const category = getCategoryInfo(categoryId);
  
  if (!category) {
    notFound();
  }
  
  // Fetch events by category directly from the database
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
  
  const formatPrice = (price) => {
    if (!price || price === "0" || price === "") {
      return "FREE";
    }
    return `Rs.${parseFloat(price).toFixed(2)}`;
  };
  
  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <div className="container">
        <h2 className="font-bold text-[#92403F] text-4xl uppercase text-center tracking-widest mt-8">
          {category.name} Events
        </h2>
        <p className="text-center text-[#2C2C2C] mt-4 mb-8">
          {category.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryEvents.length > 0 ? (
            categoryEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id}>
                <div className="bg-white/40 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src="/event.png"
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-[#92403F] text-white px-3 py-1 rounded-full text-sm">
                      {formatPrice(event.price)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-xl text-[#92403F] line-clamp-1">{event.name}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {event.startDate} | {event.venue}, {event.eventCity}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">{event.entryType}</span>
                      <button className="bg-[#92403F] text-white py-1 px-4 rounded text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-white/20 p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500 mb-4">No events found in this category</p>
              <Link href="/events">
                <button className="bg-[#92403F] text-white py-2 px-6 rounded shadow hover:bg-[#803735] transition-colors">
                  View All Events
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}