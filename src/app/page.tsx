
"use client";
import { useEffect, useState } from "react";
//import Header from "./components/header";
import Image from "next/image";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import Link from "next/link";
import HousingData from "@/housingData/housingData";

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
            <p>Su seguridad en NY, primero</p>
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
          </div>
        </>
      )}
    </>
  );
}
