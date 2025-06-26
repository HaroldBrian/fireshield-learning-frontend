import PreviewCard from './PreviewCard'
import { authDemos } from './data'

const SecurityDemos = () => {
  return (
    <section className="py-20">
      <div className="mx-20">
        <div className=" mx-auto mb-14 text-center">
          <span className="mb-2 inline-flex rounded-lg border-x-2 border-x-primary-600 bg-primary/20 px-2 text-base font-semibold text-primary-700">
            Demo
          </span>
          <h2 className="mb-2.5 text-3xl font-semibold text-default-950">
            Security
          </h2>
          <p className="text-base font-medium text-default-900">
            serves as the perfect starting point for your next project,
            showcasing the expertise in building real websites with Tailwind CSS
          </p>
        </div>
        <div className="justify-content-center grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authDemos.slice(0, 3).map((demo, idx) => (
            <PreviewCard demo={demo} key={idx} />
          ))}

          <div className="justify-center gap-3 lg:col-span-3 lg:flex">
            {authDemos.slice(3).map((demo, idx) => (
              <div className="lg:w-1/3" key={idx + demo.name}>
                <PreviewCard demo={demo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecurityDemos
