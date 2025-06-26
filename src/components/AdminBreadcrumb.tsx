import Link from 'next/link'
import { LuChevronsRight } from 'react-icons/lu'

const AdminBreadcrumb = ({ title }: { title: string }) => {
  return (
    <section className="hidden md:block">
      <div className="container">
        <div className="my-6 rounded-lg border border-default-200 bg-white dark:bg-default-50">
          <div className="flex items-center justify-between p-6">
            <h4 className="text-lg font-medium text-default-900">{title}</h4>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/dashboard"
                  className="text-base font-medium text-default-900 transition-all duration-200 hover:text-primary"
                >
                  Admin
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <LuChevronsRight
                  data-lucide="chevrons-right"
                  className="size-5 text-default-900 rtl:rotate-180"
                />
                <Link
                  href=""
                  className="text-base font-medium text-default-900"
                >
                  {title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminBreadcrumb
