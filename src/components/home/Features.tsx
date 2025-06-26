'use client'
import Image from 'next/image'
import { allFeatures } from './data'

const Features = () => {
  return (
    <section className="py-20" id="features">
      <div className="mx-20">
        <div className=" mx-auto mb-14 text-center">
          <span className="mb-2 inline-flex rounded-lg border-x-2 border-x-primary-600 bg-primary/20 px-2 text-base font-semibold text-primary-700">
            Features
          </span>
          <h2 className="mb-2.5 text-3xl font-semibold text-default-950">
            Awesome Template Features
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {allFeatures.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="rounded-xl border border-default-200 bg-white transition-all duration-300 hover:shadow-lg dark:bg-default-50"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="shrink">
                      {typeof feature.icon === 'object' ? (
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-500/20 text-primary-600">
                          <Image
                            src={feature.icon}
                            alt="iconImage"
                            className="h-6 w-6"
                          />
                        </div>
                      ) : (
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/20 text-primary-600">
                          <Icon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="grow">
                      <h4 className="mb-2 text-lg font-semibold text-default-950">
                        {feature.title}
                      </h4>
                      <p className="text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-6 text-center text-base font-medium text-primary-900">
          Empower Your Journey with Our Engaging Landing Demo.🔥
        </p>
      </div>
    </section>
  )
}

export default Features
