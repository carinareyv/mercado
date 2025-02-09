"use client";
import { useEffect, useState } from "react";
//import Header from "./components/header";
import Image from "next/image";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import Link from "next/link";
import CategoryCard from "./components/categoryCard";
import router from "next/router";

const categories = [
  { id: 1, name: "Community & Culture", imageUrl: "/securityLogoCategory.png" },
  { id: 2, name: "Education", imageUrl: "/securityLogoCategory.png" },
  { id: 3, name: "Employment", imageUrl: "/securityLogoCategory.png" },
  { id: 4, name: "Events", imageUrl: "/securityLogoCategory.png" },
  { id: 5, name: "Health", imageUrl: "/securityLogoCategory.png" },
  { id: 6, name: "Housing", imageUrl: "/securityLogoCategory.png" },
  { id: 7, name: "Legal Aid", imageUrl: "/securityLogoCategory.png" },
  { id: 8, name: "Social Services", imageUrl: "/securityLogoCategory.png" },
];

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [, setSearchQuery] = useState("");

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
    console.log(`Selected Category: ${categoryName}`);
    router.push(`/category/${categoryName.toLowerCase()}`);
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
            <div className="grid grid-cols-2 gap-4 justify-center">
            {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
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
