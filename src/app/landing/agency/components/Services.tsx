import { LuMoveRight } from "react-icons/lu";
import { services } from "../data";
import Link from "next/link";

const Services = () => {
  return (
    <section id="services" className="py-10 lg:py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-md border border-primary bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Nos formations
            </span>
            <h2 className="my-4 text-4xl font-medium capitalize text-default-950">
              Nos domaines de formation en cybersécurité
            </h2>
            <p className="text-base">
              Découvrez nos parcours spécialisés : sécurité réseau, analyse de
              vulnérabilités, gestion des incidents, sensibilisation à la
              cybersécurité et bien plus encore.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center divide-y divide-default-200 overflow-hidden rounded-md bg-default-100 dark:bg-default-50 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="group">
                <div className="p-8 sm:p-10">
                  <span>
                    <Icon className="h-14 w-14 text-default-950" />
                  </span>
                  <h2 className="mb-4 mt-8 text-2xl font-medium text-default-950">
                    {service.title}
                  </h2>
                  <p className="mb-6 text-base">{service.description}</p>
                  <Link href="/courses" className="text-lg text-default-950">
                    En savoir plus
                    <LuMoveRight className="inline-block h-6 w-6 opacity-0 transition-all duration-500 will-change-transform group-hover:translate-x-2 group-hover:opacity-100" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
