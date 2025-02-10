import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://data.cityofnewyork.us/Education/School-Zones-Map-2024-2025/shkv-c3w7');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}