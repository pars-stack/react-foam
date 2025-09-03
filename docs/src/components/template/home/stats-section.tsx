import React from 'react';

const StatsSection = () => {
  return (
    <section className="bg-background-variant py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
          <div>
            <div className="mb-2 text-4xl font-bold text-blue-600">&lt;1KB</div>
            <div className="text-gray-600">Bundle Size</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Dependencies</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-purple-600">100%</div>
            <div className="text-gray-600">TypeScript</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-orange-600">3</div>
            <div className="text-gray-600">Core APIs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
