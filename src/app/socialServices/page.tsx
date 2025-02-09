import Link from "next/link";
import Header from "../components/header";
import Image from "next/image";

export default async function SocialServices() {
  interface SocialService {
    unique_id_number: string;
    program_code: string;
    language: string;
    program_name: string;
    government_agency: string;
    population_served: string;
    program_description: string;
    url_of_online_application: string;
  }

  const data = await fetch(
    "https://data.cityofnewyork.us/resource/kvhd-5fmu.json"
  );
  const services: SocialService[] = await data.json();
  return (
    <>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-16 sm:p-20 font-montserrat]">
        <h1 className="text-[24px]">Social Services</h1>
        <ul>
          {services.map((service: SocialService) => (
            <li className="pb-5" key={service.unique_id_number}>
              <h2 className="text-[20px]">{service.program_name}</h2>
              <div className="text-[16px] flex items-center gap-2">
               <p>{service.program_description}</p> 
                <Link
                  href={service.url_of_online_application}
                  target="_blank"
                  className="flex items-center"
                >
                  {" "}
                  <Image
                    src="/CaretContainer.png"
                    alt=""
                    width={28}
                    height={63}
                    className="object-contain"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
