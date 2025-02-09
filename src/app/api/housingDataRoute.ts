// src/app/back-end/housingData
import { NextResponse } from 'next/server';

export async function GET() {
  const endpoint = 'https://data.cityofnewyork.us/resource/hg8x-zxpr.json';

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching data from NYC API' },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
