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

export interface RegisterData {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role?: "GUEST" | "HOST";
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface BookingCreateData {
  listing_id: number;
  check_in: string;
  check_out: string;
  total_guests: number;
}

export interface BookingResponse {
  id: number;
  listing_id: number;
  guest_id: number;
  check_in: string;
  check_out: string;
  total_guests: number;
  total_price: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  created_at: string;
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

export async function registerUser(data: RegisterData) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Registration failed");
  }

  return res.json();
}

export async function loginUser(email: string, password: string): Promise<AuthToken> {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Invalid login credentials");
  }

  return res.json();
}

export async function createBooking(
  data: BookingCreateData,
  token: string
): Promise<BookingResponse> {
  const res = await fetch(`${API_BASE_URL}/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to create reservation");
  }

  return res.json();
}

export async function getUserBookings(token: string): Promise<BookingResponse[]> {
  const res = await fetch(`${API_BASE_URL}/bookings/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Failed to fetch reservations");
  }

  return res.json();
}