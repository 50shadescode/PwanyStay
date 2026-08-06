const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  image_url: string;
  is_mpesa_safe: boolean;
}

export interface SearchParams {
  location?: string;
  guests?: number;
  align_sgr?: boolean;
  check_in?: string;
  check_out?: string;
}

export async function searchListings(params: SearchParams): Promise<Listing[]> {
  const query = new URLSearchParams();

  if (params.location) query.append("location", params.location);
  if (params.guests) query.append("guests", params.guests.toString());
  if (params.align_sgr) query.append("align_sgr", "true");
  if (params.check_in) query.append("check_in", params.check_in);
  if (params.check_out) query.append("check_out", params.check_out);

  const res = await fetch(`${API_BASE_URL}/listings/search?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch listings from FastAPI backend");
  }

  return res.json();
}