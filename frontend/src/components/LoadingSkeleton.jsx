const SkeletonCard = () => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-800" />
    <div className="p-5 space-y-3">
      <div className="flex justify-between">
        <div className="h-5 w-20 bg-gray-800 rounded-full" />
        <div className="h-4 w-24 bg-gray-800 rounded-full" />
      </div>
      <div className="h-5 bg-gray-800 rounded-lg" />
      <div className="h-5 w-4/5 bg-gray-800 rounded-lg" />
      <div className="space-y-2 pt-1">
        <div className="h-3 bg-gray-800 rounded-lg" />
        <div className="h-3 bg-gray-800 rounded-lg" />
        <div className="h-3 w-3/4 bg-gray-800 rounded-lg" />
      </div>
      <div className="flex justify-between pt-3 border-t border-gray-800">
        <div className="h-4 w-16 bg-gray-800 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-800 rounded-lg" />
          <div className="h-8 w-8 bg-gray-800 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const LoadingSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default LoadingSkeleton;
