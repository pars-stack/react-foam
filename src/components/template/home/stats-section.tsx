import React from 'react'

const StatsSection = () => {
  return (
      <section className="py-20 bg-background-variant">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">&lt;1KB</div>
                      <div className="text-gray-600">Bundle Size</div>
                  </div>
                  <div>
                      <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                      <div className="text-gray-600">Dependencies</div>
                  </div>
                  <div>
                      <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                      <div className="text-gray-600">TypeScript</div>
                  </div>
                  <div>
                      <div className="text-4xl font-bold text-orange-600 mb-2">3</div>
                      <div className="text-gray-600">Core APIs</div>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default StatsSection