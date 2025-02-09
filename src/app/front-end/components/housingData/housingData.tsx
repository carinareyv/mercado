// src/app/components/HousingData.tsx
import React, { useEffect, useState } from 'react';

// Define the TypeScript interface for the expected data.
// All fields are optional in case some are missing.
interface AddressData {
  house_number?: string;
  street_name?: string;
  borough?: string;
  postcode?: string;
  project_name?: string;
}

const HousingData: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Use the custom API route defined in your back-end folder.
        const response = await fetch('/back-end/housingData');
        if (!response.ok) {
          throw new Error(`Error fetching addresses: ${response.statusText}`);
        }
        const data: AddressData[] = await response.json();
        setAddresses(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  if (loading) {
    return <div className="loading">Loading housing data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="title">NYC Housing Data</h1>
      {addresses.length > 0 ? (
        <div className="grid">
          {addresses.map((address, index) => (
            <div key={index} className="card">
              <h2 className="project">
                {address.project_name || 'No Project Name'}
              </h2>
              <p>
                <span className="label">House Number:</span>{' '}
                {address.house_number || 'N/A'}
              </p>
              <p>
                <span className="label">Street Name:</span>{' '}
                {address.street_name || 'N/A'}
              </p>
              <p>
                <span className="label">Borough:</span>{' '}
                {address.borough || 'N/A'}
              </p>
              <p>
                <span className="label">Postcode:</span>{' '}
                {address.postcode || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data">No housing data found.</div>
      )}

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f8f8f8;
        }
        .title {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
          font-size: 2rem;
        }
        .loading,
        .error,
        .no-data {
          text-align: center;
          font-size: 1.2rem;
          padding: 2rem;
        }
        .error {
          color: red;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .card {
          background: #fff;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
        .project {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        p {
          margin: 0.5rem 0;
          font-size: 0.95rem;
          color: #444;
        }
      `}</style>
    </div>
  );
};

export default HousingData;
