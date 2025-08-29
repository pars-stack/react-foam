import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/assets/images/logo.png'

const Logo = ({ className }: { className?: string }) => {
    return (
        <Link href='/' className={cn(className, 'flex items-center space-x-2')}>
            <div className="w-8 h-8 flex items-center justify-center">
                <Image
                    src={logo}
                    alt='react foam logo'
                    width={32}
                    height={32}
                />
            </div>

            <span className="text-xl font-bold bg-gradient-to-bl from-teal-700 to-teal-400 bg-clip-text text-transparent">
                React Foam
            </span>
        </Link>
    )
}

export default Logo