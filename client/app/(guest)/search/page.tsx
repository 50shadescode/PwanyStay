import { Suspense } from "react";
import SearchResults, { SearchResultsFallback } from "@/components/ui/search-results";

interface SearchPageProps {
  searchParams: Promise<{
    location?: string;
    check_in?: string;
    check_out?: string;
    guests?: string;
    align_sgr?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-10 pb-6 border-b border-gray-100">
        <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Sprint 2: Search Engine
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-4 tracking-tight">
          Available Coastal Stays
        </h1>
        {resolvedParams.location && (
          <p className="text-gray-600 mt-2 text-lg">
            Showing results for: <span className="font-semibold text-blue-900">"{resolvedParams.location}"</span>
          </p>
        )}
      </header>

      <Suspense fallback={<SearchResultsFallback />}>
        <SearchResults params={resolvedParams} />
      </Suspense>
    </main>
  );
}