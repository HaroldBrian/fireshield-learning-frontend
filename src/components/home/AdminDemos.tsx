import uiDark from '@/assets/images/demo/ui-components-dark.png'
import ui from '@/assets/images/demo/ui-components.png'
import PreviewCard from './PreviewCard'
import { adminDemos, type DemoType } from './data'

const AdminDemos = () => {
  const uiDemo: DemoType = {
    darkImage: uiDark,
    lightImage: ui,
    link: '/admin/ui-components',
    name: 'Ui Components',
  }
  return (
    <section id="admin-demo" className="py-20">
      <div className="mx-20">
        <div className=" mx-auto mb-14 text-center">
          <span className="mb-2 inline-flex rounded-lg border-x-2 border-x-primary-600 bg-primary/20 px-2 text-base font-semibold text-primary-700">
            Demo
          </span>
          <h2 className="mb-2.5 text-3xl font-semibold text-default-950">
            Admin Demo
          </h2>
          <p className="text-base font-medium text-default-900">
            a cutting-edge, one-page template designed for unparalleled
            performance and seamless user experiences
          </p>
        </div>
        <div className="justify-content-center grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {adminDemos.map((demo, idx) => (
            <PreviewCard demo={demo} key={idx} />
          ))}
          <div className="justify-center gap-3 lg:col-span-3 lg:flex">
            <div className="lg:w-1/3">
              <PreviewCard demo={uiDemo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDemos
