import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const categories = [
    { id: "music", name: "Music", image: "/categories_img/music.webp" },
    { id: "art", name: "Art", image: "/categories_img/art.webp" },
    { id: "culture", name: "Cultural", image: "/categories_img/culture.webp" },
    { id: "sports", name: "Sports", image: "/categories_img/sports.webp" },
    { id: "workshops", name: "Workshops", image: "/categories_img/workshops.webp" },
    { id: "business", name: "Business", image: "/categories_img/business.webp" },
    { id: "health", name: "Health", image: "/categories_img/health.webp" },
    { id: "wedding", name: "Wedding", image: "/categories_img/wedding.webp" },
  ];

  return (
    <div className="pt-24 pb-24 bg-gradient-to-br from-[#FCE5D8] to-[#FBE8EF] min-h-screen">
      <h2 className="mt-24 container font-bold text-[#92403F] text-4xl uppercase text-center tracking-widest">
        Explore Event Categories
      </h2>
      <div className="container p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12">
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id}>
            <div className="bg-[#FFFFFF33]/10 p-3 rounded-xl shadow-card">
              <div className="relative max-w-full h-48">
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  layout="fill"
                  className="object-cover rounded-md"
                />
              </div>
              <p className="text-[#A15842] font-medium text-xl mt-3">
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}