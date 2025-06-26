'use client'
import logoSm from '@/assets/images/logo-sm.png'
import { LuAirplay, LuEye } from 'react-icons/lu'

import backgroundLine2 from '@/assets/images/other/bg-lines-2.png'
import backgroundLine2Dark from '@/assets/images/other/bg-lines-2-dark.png'

import { developmentTools } from './data'
import { useLayoutContext } from '@/context'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  const { themeMode } = useLayoutContext()
  return (
    <section
      className="bg-default-10 relative border-b border-default-100  py-6 dark:bg-default-50 sm:py-10 md:py-32"
      style={{
        backgroundImage: `url(${themeMode === 'light' ? backgroundLine2.src : backgroundLine2Dark.src})`,
      }}
      id="home"
    >
      <div className="px-6 sm:px-10 md:px-20">
        <div className="grid items-center gap-x-6 gap-y-10">
          <div className="mb-10 mt-12 flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="mb-4 flex items-center justify-center gap-4">
                <span className="h-10">
                  <Image
                    src={logoSm}
                    width={40}
                    height={40}
                    alt="images"
                    className="h-full max-w-full"
                  />
                </span>
                <span className="inline-block rounded-md bg-primary/10 px-4 text-base/loose font-semibold text-primary">
                  v1.0.0
                </span>
              </div>
              <h1 className="mb-6 text-3xl font-semibold capitalize text-default-950 sm:text-5xl/tight">
                <span className="text-primary">AeroPage</span> - One Page
                Template
              </h1>
              <p className="mx-auto max-w-3xl text-base text-default-700">
                The Make your website or web application perfect starting point
                for your next project and the ultimate resource for learning how
                experts build real websites with Tailwind CSS.
              </p>
            </div>
            <div className="my-16 text-center">
              <p className="text-xl font-medium text-default-900">
                Technology stack
              </p>
              <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3">
                {developmentTools.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="hs-tooltip inline-block [--placement:top] [--trigger:hover]"
                    >
                      <div className="hs-tooltip-toggle flex h-14 w-14 items-center justify-center rounded-lg bg-default-100">
                        <Image
                          alt="logoImage"
                          src={item.logo}
                          className="h-8 w-8"
                        />
                      </div>
                      <div
                        className="hs-tooltip-content relative z-50 hidden rounded bg-default-950 px-3 py-1 font-semibold text-default-200 opacity-0 transition-opacity hs-tooltip-shown:visible hs-tooltip-shown:opacity-100"
                        role="tooltip"
                        data-popper-placement="top"
                      >
                        {item.name}
                        <div className="absolute -bottom-1 start-1/2 -z-10 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[1px] bg-default-950" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#demos"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2 font-semibold text-white backdrop-blur-2xl transition-all duration-500 hover:bg-primary-600"
              >
                {' '}
                Landing Demos <LuEye className="ms-3 h-5 w-5" />
              </a>
              <Link
                href="/admin/dashboard"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-primary/20 px-6 py-2 font-semibold text-primary backdrop-blur-2xl transition-all duration-500 hover:bg-primary hover:text-white"
              >
                {' '}
                Admin Demos <LuAirplay className="ms-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
