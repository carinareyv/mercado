"use client"

import React, { useEffect, useState } from 'react';
import Header from "../components/header";


export interface SchoolZoneDataType {
    school_name?: string;
    zone?: string;
    address?: string;
    borough?: string;
    postcode?: string;
}

const SchoolsByZone = () => {
    const [data, setData] = useState<SchoolZoneDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/schoolsByZone');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: SchoolZoneDataType[] = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Group data by borough. If borough is missing, assign "Unknown".
    const groupedData = data.reduce((acc: Record<string, SchoolZoneDataType[]>, item) => {
        const borough = item.borough || "Unknown";
        if (!acc[borough]) {
            acc[borough] = [];
        }
        acc[borough].push(item);
        return acc;
    }, {});

    return (
    <>
        <Header />
        <div className="min-h-screen container mx-auto px-4 py-8 font-montserrat">
            <h1 className="text-[18px] font-extrabold text-center mb-8">
                Housing Data
            </h1>
            <h1>Schools By Zone</h1>
            {Object.entries(groupedData).map(([borough, schools]) => (
                <div key={borough}>
                    <h2>{borough}</h2>
                    <ul>
                        {schools.map((school, index) => (
                            <li key={index}>
                                <strong>{school.school_name}</strong><br />
                                {school.address}<br />
                                Zone: {school.zone}<br />
                                Postcode: {school.postcode}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </>
    );
};

export default SchoolsByZone;