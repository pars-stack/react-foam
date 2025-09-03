import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code, Rocket, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

const FeaturedSection = () => {
  return (
    <section className="bg-background/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Why Choose React Foam?
          </h2>
          <p className="text-foreground mx-auto max-w-2xl text-xl">
            Built for modern React applications with performance and simplicity
            in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built on React&apos;s useSyncExternalStore for optimal
                performance with automatic memoization.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-200">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Type Safe</CardTitle>
              <CardDescription>
                TypeScript-first design with full type inference and
                IntelliSense support out of the box.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-200">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Zero Boilerplate</CardTitle>
              <CardDescription>
                Simple API that eliminates reducers, actions, and complex setup.
                Just create and use.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 transition-colors group-hover:bg-orange-200">
                <Rocket className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Tiny Bundle</CardTitle>
              <CardDescription>
                Less than 2KB gzipped with zero dependencies. Perfect for
                performance-conscious applications.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 transition-colors group-hover:bg-indigo-200">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Selective Updates</CardTitle>
              <CardDescription>
                Components only re-render when their selected state changes, not
                the entire store.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 transition-colors group-hover:bg-pink-200">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Developer Friendly</CardTitle>
              <CardDescription>
                Intuitive API that feels natural to React developers with
                excellent debugging support.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
