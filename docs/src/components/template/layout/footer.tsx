import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

import Logo from '../logo';

const thisYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="border-t">
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-400">
                Lightweight state management for modern React applications.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Documentation</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/docs"
                    className="transition-colors hover:text-white"
                  >
                    Getting Started
                  </Link>
                </li>
                {/* <li><Link href="/docs/api" className="hover:text-white transition-colors">API Reference</Link></li>
                                <li><Link href="/docs/examples" className="hover:text-white transition-colors">Examples</Link></li> */}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="https://github.com/pars-stack/react-foam"
                    target="_blank"
                    className="transition-colors hover:text-white"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">More</h3>
              <ul className="space-y-2 text-gray-400">
                {/* <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li> */}
                <li>
                  <Link
                    href="https://github.com/pars-stack/react-foam/?tab=contributing-ov-file#contributing-to-react-foam"
                    className="transition-colors hover:text-white"
                  >
                    Contributing
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/pars-stack/react-foam/?tab=MIT-1-ov-file#readme"
                    className="transition-colors hover:text-white"
                  >
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-gray-400">
              © {thisYear} React Foam. All rights reserved.
            </p>
            <div className="mt-4 flex items-center space-x-1 sm:mt-0">
              <span className="text-gray-400">Made with</span>
              <div className="flex items-center space-x-1">
                <span className="text-red-500">♥</span>
                <span className="text-gray-400">
                  by{' '}
                  <Link href="https://github.com/pars-stack" target="_blank">
                    Pars Stack
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
