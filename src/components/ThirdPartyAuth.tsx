import Link from 'next/link'

const ThirdPartyAuth = () => {
  return (
    <>
      <div className="my-6 flex shrink items-center">
        <div className="mt-px flex-auto border-t border-dashed border-white/20" />
        <div className="mx-4 text-zinc-100">Ou</div>
        <div className="mt-px flex-auto border-t border-dashed border-white/20" />
      </div>
      <div className="mb-6 shrink text-center">
        <p className="mb-6 text-xl text-white">Continuer avec</p>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          <li>
            <Link
              href=""
              className="group inline-flex size-12 items-center justify-center rounded-full bg-zinc-900 transition-all duration-300 hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="facebook"
                className="lucide lucide-facebook size-5 text-gray-400 group-hover:fill-white/30 group-hover:text-white"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="group inline-flex size-12 items-center justify-center rounded-full bg-zinc-900 transition-all duration-300 hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-google size-5 text-gray-400 group-hover:fill-white/30 group-hover:text-white"
              >
                <g>
                  <path d="M21.35 11.1H12v2.8h5.35c-.23 1.2-1.4 3.5-5.35 3.5-3.22 0-5.85-2.67-5.85-5.9s2.63-5.9 5.85-5.9c1.83 0 3.06.78 3.76 1.44l2.57-2.5C17.09 3.6 14.77 2.5 12 2.5 6.75 2.5 2.5 6.75 2.5 12s4.25 9.5 9.5 9.5c5.47 0 9.09-3.84 9.09-9.25 0-.62-.07-1.09-.16-1.55z" />
                </g>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="group inline-flex size-12 items-center justify-center rounded-full bg-zinc-900 transition-all duration-300 hover:bg-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                data-lucide="linkedin"
                className="lucide lucide-linkedin size-5 text-gray-400 group-hover:fill-white/30 group-hover:text-white"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width={4} height={12} x={2} y={9} />
                <circle cx={4} cy={4} r={2} />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ThirdPartyAuth
