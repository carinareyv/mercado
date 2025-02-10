"use client";
import { useEffect, useState } from "react";
//import Header from "./components/header";
import Image from "next/image";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import Link from "next/link";

import CategoryCard from "./components/categoryCard";
import { useRouter } from "next/navigation";

const categories = [
  {
    id: 1,
    name: "experts",
    label: "Consult with experts",
    imageUrl: "/Users.png",
  },
  {
    id: 2,
    name: "communityCulture",
    label: "Community & Culture",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 3,
    name: "education",
    label: "Education",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 4,
    name: "employment",
    label: "Employment",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 5,
    name: "events",
    label: "Events",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 6,
    name: "health",
    label: "Health",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 7,
    name: "housing",
    label: "Housing",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 8,
    name: "legalAid",
    label: "Legal Aid",
    imageUrl: "/securityLogoCategory.png",
  },
  {
    id: 9,
    name: "socialServices",
    label: "Social Services",
    imageUrl: "/securityLogoCategory.png",
  },
];

// const categoryRouteMapping: { [key: string]: string } = {
//   education: "schoolsByZone",
//   housing: "housingData",
//   "social services": "socialServices",
// };

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (query: string) => {
    console.log("Searching for category: ", query);
    setSearchQuery(query);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 4000); // Show image for 4 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    //const lowerName = categoryName.toLowerCase();
    //const routeSegment = categoryRouteMapping[lowerName] || lowerName;
   // console.log(`Navigating to /category/${routeSegment}`);
    router.push(`${categoryName}`);
  };
  return (
    <>
      {showImage ? (
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className=" flex flex-col items-center justify-center min-h-screen gap-4 text-center">
            <Image
              src="/mercadoSplash.png"
              alt="Splash Screen"
              width={170}
              height={145}
            />
            <Image
              src="/Mercado.png"
              alt="Splash Screen"
              width={370}
              height={78}
              className="mt=4"
            />
            <p>su seguridad en NY, primero</p>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="flex flex-col gap-5 justify-center items-center font-montserrat]">
            <SearchBar onSearch={handleSearch} placeholder="Search category" />
            <Link href="" target="_blank" className="flex items-center">
              {" "}
              <Image
                src="/SecurityCard.png"
                alt="Splash Screen"
                width={390}
                height={72}
                className="mt=4"
              />
            </Link>
            <h1 className="text-xl items-start">Categories</h1>
            <div className="grid grid-cols-2 gap-4 justify-center items-center">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.label}
                  imageUrl={category.imageUrl}
                  onClick={() => handleCategoryClick(category.name)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
