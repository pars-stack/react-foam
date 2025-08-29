import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Logo from '../logo'

const thisYear = new Date().getFullYear()

const Footer = () => {
    
  return (
      <div className="border-t">
          <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div>
                          <div className="flex items-center space-x-2 mb-4">
                              <Logo />
                              <span className="text-xl font-bold bg-gradient-to-bl from-teal-700 to-teal-400 bg-clip-text text-transparent">
                                  React Foam
                              </span>
                          </div>
                          <p className="text-gray-400">
                              Lightweight state management for modern React applications.
                          </p>
                      </div>

                      <div>
                          <h3 className="font-semibold mb-4">Documentation</h3>
                          <ul className="space-y-2 text-gray-400">
                              <li><Link href="/docs" className="hover:text-white transition-colors">Getting Started</Link></li>
                              <li><Link href="/docs/api" className="hover:text-white transition-colors">API Reference</Link></li>
                              <li><Link href="/docs/examples" className="hover:text-white transition-colors">Examples</Link></li>
                          </ul>
                      </div>

                      <div>
                          <h3 className="font-semibold mb-4">Community</h3>
                          <ul className="space-y-2 text-gray-400">
                              <li><Link href="https://github.com/pars-stack/react-foam" target='_blank' className="hover:text-white transition-colors">GitHub</Link></li>
                          </ul>
                      </div>

                      <div>
                          <h3 className="font-semibold mb-4">More</h3>
                          <ul className="space-y-2 text-gray-400">
                              {/* <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li> */}
                              <li><Link href="#" className="hover:text-white transition-colors">Contributing</Link></li>
                              <li><Link href="#" className="hover:text-white transition-colors">License</Link></li>
                          </ul>
                      </div>
                  </div>

                  <Separator className="my-8 bg-gray-800" />

                  <div className="flex flex-col sm:flex-row justify-between items-center">
                      <p className="text-gray-400">
                          © {thisYear} React Foam. All rights reserved.
                      </p>
                      <div className="flex items-center space-x-1 mt-4 sm:mt-0">
                          <span className="text-gray-400">Made with</span>
                          <div className="flex items-center space-x-1">
                              <span className="text-red-500">♥</span>
                              <span className="text-gray-400">by <Link href="https://github.com/pars-stack" target='_blank'>Pars Stack</Link></span>
                          </div>
                      </div>
                  </div>
              </div>
          </footer>
      </div>
  )
}

export default Footer