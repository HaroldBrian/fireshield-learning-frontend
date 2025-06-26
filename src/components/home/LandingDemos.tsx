import webDesignerDark from '@/assets/images/demo/web-designer-dark.png'
import webDesigner from '@/assets/images/demo/web-designer.png'
import PreviewCard from './PreviewCard'
import { landingDemos, type DemoType } from './data'

const LandingDemos = () => {
  const webDemo: DemoType = {
    darkImage: webDesignerDark,
    lightImage: webDesigner,
    link: '/landing/web-designer',
    name: 'Web Designer',
  }
  return (
    <section id="demos" className="py-20">
      <div className="mx-20">
        <div className=" mx-auto mb-14 text-center">
          <span className="mb-2 inline-flex rounded-lg border-x-2 border-x-primary-600 bg-primary/20 px-2 text-base font-semibold text-primary-700">
            Demo
          </span>
          <h2 className="mb-2.5 text-3xl font-semibold text-default-950">
            Landing Demo
          </h2>
          <p className="text-base font-medium text-default-900">
            Elevate Your Presence: Unveiling the Power of Our Landing Demo!
          </p>
        </div>
        <div className="justify-content-center grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {landingDemos.map((demo, idx) => {
            return <PreviewCard demo={demo} key={idx} />
          })}
          <div className="justify-center gap-3 lg:col-span-3 lg:flex">
            <div className="lg:w-1/3">
              <PreviewCard demo={webDemo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingDemos
