import React from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Github } from 'lucide-react'
import CopyButton from '@/components/common/copy-button'
import Link from 'next/link'
const GettingStartedSection = () => {
    const bashText = "npm install react-foam"
    return (
        <section id="get-started" className="py-20 bg-gradient-to-br from-primary to-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                    Ready to Get Started?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                    Install React Foam and start building better React applications today.
                </p>

                <div className="bg-black/20 relative rounded-lg p-6 mb-8 max-w-2xl mx-auto">
                    <CopyButton text={bashText} className='absolute right-3 top-1/2 -translate-y-1/2 not-dark:text-neutral-50' />
                    <code className="text-white text-lg">{bashText}</code>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href='/docs'>
                        <Button size="lg" className='cursor-pointer' variant="default">
                            <BookOpen className="w-5 h-5 mr-2" />
                            Read Documentation
                        </Button>
                    </Link>
                    <Link href='https://github.com/pars-stack/react-foam' target='_blank'>
                        <Button
                            size="lg"
                            variant="outline"
                            className="cursor-pointer text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                        >
                            <Github className="w-5 h-5 mr-2" />
                            View on GitHub
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default GettingStartedSection