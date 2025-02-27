import Image from "next/image";
import { db } from "../db";
import { events } from "../drizzle/schema";
import Link from "next/link";

export default async function Home() {
  const eventsTable = await db
    .select({
      id: events.id,
      name: events.name,
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
    .from(events);

  const firstEvent = eventsTable[0];

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <div className="container justify-center flex flex-col lg:flex-row lg:gap-16 gap-8 py-24 items-center">
        <Link href={`/events/${firstEvent?.id}`}>
          <div className="relative max-w-full cursor-pointer overflow-hidden rounded-lg">
            <Image
              src={firstEvent?.bannerImage}
              alt="event image"
              width={500}
              height={320}
              className="rounded-lg hover:scale-105 transform transition-transform duration-300 object-cover"
            />
          </div>
        </Link>

        <div className="flex flex-col gap-3">
          <div className="text-[#5B5B5B] font-normal text-xl">
            {firstEvent?.startDate} | {firstEvent?.venue}
          </div>
          <Link href={`/events/${firstEvent?.id}`}>
            <h3 className="text-[#92403F] text-4xl font-semibold cursor-pointer">
              {firstEvent?.name}
            </h3>
          </Link>
          <div
            className="text-[#2C2C2C] font-normal text-2xl"
            dangerouslySetInnerHTML={{ __html: firstEvent?.description }}
          />
        </div>
      </div>
      <div className="container py-24 w-full">
        <h2 className="container font-bold text-[#92403F] text-4xl uppercase text-center tracking-widest">
          Explore Event Categories
        </h2>
        <div className="container p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12">
          <Link href="/categories/music">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/music.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">Music</p>
            </div>
          </Link>

          <Link href="/categories/art">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/art.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">Art</p>
            </div>
          </Link>

          <Link href="/categories/culture">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/culture.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">
                Cultural
              </p>
            </div>
          </Link>

          <Link href="/categories/sports">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/sports.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">Sports</p>
            </div>
          </Link>

          <Link href="/categories/workshops">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/workshops.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">
                Workshops
              </p>
            </div>
          </Link>

          <Link href="/categories/business">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/business.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">
                Business
              </p>
            </div>
          </Link>

          <Link href="/categories/health">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/health.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">Health</p>
            </div>
          </Link>

          <Link href="/categories/wedding">
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src="/categories_img/wedding.webp"
                  alt="event category photo"
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">Wedding</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="container pb-24 w-full">
        <h2 className="font-bold text-[#92403F] text-4xl uppercase text-center tracking-widest">
          Upcoming Events
        </h2>
        <div className="container grid grid-cols-1 lg:grid-cols-2 mt-12">
          {eventsTable.slice(1, 5).map((data) => (
            <div className="flex justify-between max-w-[600px] p-4">
              <div className="flex flex-col gap-3">
                <div className="text-[#5B5B5B] font-normal text-sm">
                  {data.startDate} | {data.venue}
                </div>
                <h3 className="text-[#92403F] text-base font-semibold cursor-pointer">
                  {data.name}
                </h3>
                <div
                  className="text-[#2C2C2C] font-normal text-md"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
                <button className="bg-[#92403F] text-white py-2 max-w-32 font-normal text-sm rounded-sm">
                  Join Now
                </button>
              </div>
              <div className="cursor-pointer overflow-hidden w-[134px] h-[250px] relative">
                <Image
                  src={data.bannerImage}
                  alt="event photo"
                  className="hover:scale-105 transform transition-transform duration-300 object-cover"
                  layout="fill"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
