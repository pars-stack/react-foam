"use client";
import { CodeBlock } from '@/components/common/code-block'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code, Rocket } from 'lucide-react'
import { useTheme } from 'next-themes'

const CodeExampleSection = () => {
    const { theme } = useTheme();
    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Simple Yet Powerful
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        See how easy it is to create and use stores with React Foam.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Code className="w-5 h-5 mr-2" />
                                Create a Store
                            </CardTitle>
                            <CardDescription>
                                Define your state shape and create a store in seconds.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock language='ts' theme={theme}
                                code={`import { createStore } from 'react-foam';

interface CounterState {
  count: number;
  step: number;
}

const useCounterStore = createStore<CounterState>({
  count: 0,
  step: 1
});`} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Rocket className="w-5 h-5 mr-2" />
                                Use in Components
                            </CardTitle>
                            <CardDescription>
                                Access and update state with a simple hook interface.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock language='tsx' theme={theme} code={`function Counter() {
  const { count, step } = useCounterStore();
  
  const increment = () => {
    useCounterStore.setState(state => ({
      ...state,
      count: state.count + state.step
    }));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>
        +{step}
      </button>
    </div>
  );
}`} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default CodeExampleSection