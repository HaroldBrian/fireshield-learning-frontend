import Link from 'next/link'
import type { DemoType } from './data'
import { LuExternalLink } from 'react-icons/lu'
import Image from 'next/image'

const PreviewCard = ({ demo }: { demo: DemoType }) => {
  const { darkImage, lightImage, link, name } = demo
  return (
    <Link href={link} target="_blank">
      <div className="group relative rounded-lg border border-default-100 bg-white text-center shadow-md transition-all duration-500 hover:-translate-y-1 dark:bg-default-50">
        <div className="p-4">
          <div className="relative overflow-hidden rounded-lg ">
            <Image
              alt="demo-img"
              className="w-full rounded-lg border border-default-100 dark:hidden"
              src={lightImage}
            />
            <Image
              alt="demo-img"
              className="hidden w-full rounded-lg border border-default-100 dark:block"
              src={darkImage}
            />
            <div className="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-default-500/20 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="inline-flex items-center justify-center rounded-lg bg-primary py-1.5 pe-2 ps-5 text-center align-middle text-base font-semibold text-white duration-500 hover:bg-primary-600">
                Live Preview{' '}
                <span className="ms-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white bg-white text-primary">
                  <LuExternalLink className="h-5 w-5" />
                </span>
              </div>
            </div>
          </div>
          <h5 className="mt-4 text-center text-lg font-semibold capitalize text-default-900">
            {name}
          </h5>
        </div>
      </div>
    </Link>
  )
}

export default PreviewCard
