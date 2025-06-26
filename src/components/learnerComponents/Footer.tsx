/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full border-t border-default-200 bg-white py-4 dark:bg-default-50">
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <p className="text-center text-default-900 lg:text-start">
            {new Date().getFullYear()} © Fireshield Learning. Développé&nbsp;
            <span className="text-red-500">❤️</span> par&nbsp;
            <Link
              className="text-primary-700"
              href="https://Fireshieldsec.com/"
              target="_blank"
            >
              Fireshield Security
            </Link>
          </p>
          <div className="hidden justify-center gap-6 text-center lg:flex lg:justify-end">
            <Link href="" className="font-medium text-default-500">
              Termes d'utilisation
            </Link>
            <Link href="" className="font-medium text-default-500">
              Confidentialité
            </Link>
            <Link href="" className="font-medium text-default-500">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
