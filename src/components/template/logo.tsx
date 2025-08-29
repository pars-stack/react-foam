import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
    <Link href='/'>
        <div className="w-8 h-8 flex items-center justify-center">
            <Image
                src="/images/logo.png"
                alt='react foam logo'
                width={32}
                height={32}
                />
        </div>
    </Link>
  )
}

export default Logo