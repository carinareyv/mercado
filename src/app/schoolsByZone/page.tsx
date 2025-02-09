// import React, { useEffect, useState } from 'react';

// const SchoolsByZone = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch('https://data.cityofnewyork.us/Education/School-Zones-Map-2024-2025/shkv-c3w7')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setData(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     return (
//         <div>
//             <h1>School Zones Map 2024-2025</h1>
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//     );
// };

// export default SchoolsByZone;
// import { NextApiRequest, NextApiResponse } from 'next';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const response = await fetch('https://data.cityofnewyork.us/Education/School-Zones-Map-2024-2025/shkv-c3w7');
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export default handler;