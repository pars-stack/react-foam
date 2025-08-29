import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Rocket, Shield, TrendingUp, Users, Zap } from 'lucide-react'
import React from 'react'

const FeaturedSection = () => {
  return (
      <section className="py-20 bg-background/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                      Why Choose React Foam?
                  </h2>
                  <p className="text-xl text-foreground max-w-2xl mx-auto">
                      Built for modern React applications with performance and simplicity in mind.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                              <Zap className="w-6 h-6 text-blue-600" />
                          </div>
                          <CardTitle>Lightning Fast</CardTitle>
                          <CardDescription>
                              Built on React&apos;s useSyncExternalStore for optimal performance with automatic memoization.
                          </CardDescription>
                      </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                              <Shield className="w-6 h-6 text-green-600" />
                          </div>
                          <CardTitle>Type Safe</CardTitle>
                          <CardDescription>
                              TypeScript-first design with full type inference and IntelliSense support out of the box.
                          </CardDescription>
                      </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                              <Code className="w-6 h-6 text-purple-600" />
                          </div>
                          <CardTitle>Zero Boilerplate</CardTitle>
                          <CardDescription>
                              Simple API that eliminates reducers, actions, and complex setup. Just create and use.
                          </CardDescription>
                      </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                              <Rocket className="w-6 h-6 text-orange-600" />
                          </div>
                          <CardTitle>Tiny Bundle</CardTitle>
                          <CardDescription>
                              Less than 2KB gzipped with zero dependencies. Perfect for performance-conscious applications.
                          </CardDescription>
                      </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                              <TrendingUp className="w-6 h-6 text-indigo-600" />
                          </div>
                          <CardTitle>Selective Updates</CardTitle>
                          <CardDescription>
                              Components only re-render when their selected state changes, not the entire store.
                          </CardDescription>
                      </CardHeader>
                  </Card>

                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                              <Users className="w-6 h-6 text-pink-600" />
                          </div>
                          <CardTitle>Developer Friendly</CardTitle>
                          <CardDescription>
                              Intuitive API that feels natural to React developers with excellent debugging support.
                          </CardDescription>
                      </CardHeader>
                  </Card>
              </div>
          </div>
      </section>
  )
}

export default FeaturedSection