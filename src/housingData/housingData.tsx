"use client"

import Header from "../app/components/header";

// Define the TypeScript interface for the expected data.
export interface HousingDataType {
  project_name?: string;
  house_number?: string;
  street_name?: string;
  borough?: string;
  postcode?: string;
}

export default async function HousingData() {
  // Fetch data from the NYC API.
  const res = await fetch("https://data.cityofnewyork.us/resource/hg8x-zxpr.json");
  const housingDatas: HousingDataType[] = await res.json();

  // Group data by borough. If borough is missing, assign "Unknown".
  const groupedData = housingDatas.reduce((acc: Record<string, HousingDataType[]>, data) => {
    const borough = data.borough || "Unknown";
    if (!acc[borough]) {
      acc[borough] = [];
    }
    acc[borough].push(data);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="min-h-screen container mx-auto px-4 py-8 font-montserrat">
        <h1 className="text-[18px] font-extrabold text-center mb-8">
          Housing Data
        </h1>

        <></>
        {Object.keys(groupedData).map((borough) => {
          // Filter out entries where the project_name is "CONFIDENTIAL" (case insensitive)
          const filteredData = groupedData[borough].filter(
            (data) => data.project_name?.toLowerCase() !== "confidential"
          );

          // Only render borough section if there's data to display.
          if (filteredData.length === 0) return null;

          return (
            <div key={borough} className="mb-12">
            <h2 className="text-2xl font-extrabold mb-4 uppercase">{borough}</h2> {/* Borough in larger bold letters */}
              <ul className="space-y-4">
                {filteredData.map((housingData, index) => (
                  <li key={index} className="pb-5 border-b border-gray-300">
                    <p className="text-lg">
                      <span className="font-semibold">Project Name:</span>{" "}
                      {housingData.project_name || "N/A"}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Street Number:</span>{" "}
                      {housingData.house_number || "N/A"}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Street Name:</span>{" "}
                      {housingData.street_name || "N/A"}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Postcode:</span>{" "}
                      {housingData.postcode || "N/A"}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}











// // src/app/components/HousingData.tsx

// "use client";
// import Header from "../components/header";
// import React, { useEffect, useState } from 'react';

// // Define the TypeScript interface for the expected data.
// // All fields are optional in case some are missing.
// interface AddressData {
//   house_number?: string;
//   street_name?: string;
//   borough?: string;
//   postcode?: string;
//   project_name?: string;
// }

// const HousingData: React.FC = () => {
//   const [addresses, setAddresses] = useState<AddressData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const response = await fetch('https://data.cityofnewyork.us/resource/hg8x-zxpr.json');
//         if (!response.ok) {
//           throw new Error(`Error fetching addresses: ${response.statusText}`);
//         }
//         const data: AddressData[] = await response.json();
//         setAddresses(data);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError('An unexpected error occurred.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAddresses();
//   }, []);

//   if (loading) {
//     return <div className="loading">Loading housing data...</div>;
//   }

//   if (error) {
//     return <div className="error">Error: {error}</div>;
//   }

//   return (
//     <div className="container">
//       <h1 className="title">NYC Housing Data</h1>
//       {addresses.length > 0 ? (
//         <div className="grid">
//           {addresses.map((address, index) => (
//             <div key={index} className="card">
//               <h2 className="project">
//                 {address.project_name || 'No Project Name'}
//               </h2>
//               <p>
//                 <span className="label">House Number:</span>{' '}
//                 {address.house_number || 'N/A'}
//               </p>
//               <p>
//                 <span className="label">Street Name:</span>{' '}
//                 {address.street_name || 'N/A'}
//               </p>
//               <p>
//                 <span className="label">Borough:</span>{' '}
//                 {address.borough || 'N/A'}
//               </p>
//               <p>
//                 <span className="label">Postcode:</span>{' '}
//                 {address.postcode || 'N/A'}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-data">No housing data found.</div>
//       )}

//       <style jsx>{`
//         .container {
//           max-width: 1200px;
//           margin: 2rem auto;
//           padding: 1rem;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           background: #f8f8f8;
//         }
//         .title {
//           text-align: center;
//           margin-bottom: 2rem;
//           color: #333;
//           font-size: 2rem;
//         }
//         .loading,
//         .error,
//         .no-data {
//           text-align: center;
//           font-size: 1.2rem;
//           padding: 2rem;
//         }
//         .error {
//           color: red;
//         }
//         .grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 1.5rem;
//         }
//         .card {
//           background: #fff;
//           padding: 1rem 1.5rem;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
//         }
//         .project {
//           font-size: 1.2rem;
//           margin-bottom: 0.5rem;
//           color: #2c3e50;
//         }
//         .label {
//           font-weight: bold;
//           color: #555;
//         }
//         p {
//           margin: 0.5rem 0;
//           font-size: 0.95rem;
//           color: #444;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HousingData;
