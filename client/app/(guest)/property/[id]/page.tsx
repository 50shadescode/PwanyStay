interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Stay Details
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">
          Property #{id}
        </h1>
        <p className="text-gray-500 mt-2">
          Fetching live availability and M-Pesa payment verification details from FastAPI...
        </p>

        {/* Temporary Placeholder UI for Sprint 2 */}
        <div className="mt-6 border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            [ Property Gallery Placeholder ]
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="h-10 bg-emerald-600 rounded-lg text-white font-semibold flex items-center justify-center mt-6">
              Book Stay via M-Pesa
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}