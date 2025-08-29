import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Download, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logoHuge from '@/assets/images/logo-huge.png'
const HeroSection = () => {
    return (
        <section className="relative overflow-hidden py-20 sm:py-32">
            <div className="opacity-75 max-sm:hidden max-lg:opacity-20 absolute bottom-5 right-5 z-10 w-100 h-100 flex items-center justify-center">
                <Image
                    className='animate-spin [animation-duration:120s] '
                    src={logoHuge}
                    alt='react foam logo'
                    width={400}
                    height={400}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-background-variant via-background to-background-accent" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left">
                    <div className="flex justify-start mb-6">
                        <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">
                            <Star className="w-3 h-3 mr-1" />
                            Lightweight State Management
                        </Badge>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
                        State Management
                        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Made Simple
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mr-auto">
                        React Foam is a lightweight, TypeScript-first state management library that eliminates boilerplate
                        while providing exceptional performance and developer experience.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <Link href='#get-started'>
                            <Button size="lg" className="cursor-pointer bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                                <Download className="w-5 h-5 mr-2" />
                                Get Started
                            </Button>
                        </Link>
                        <Link href='/docs'>
                            <Button size="lg" className='cursor-pointer' variant="outline">
                                <BookOpen className="w-5 h-5 mr-2" />
                                View Documentation
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection