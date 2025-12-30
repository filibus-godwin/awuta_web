export default function Loading() {
  return (
    <div className="pt-24 max-w-7xl mx-auto px-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
