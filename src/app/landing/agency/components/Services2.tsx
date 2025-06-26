/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import agency10 from "@/assets/images/landing/agency/img-10.jpg";

const Services2 = () => {
  return (
    <section id="serice" className="py-10 lg:py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-md border border-primary bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Atouts
            </span>
            <p className="mt-5 text-lg font-medium text-default-800">
              Fireshield Learning vous accompagne dans la maîtrise des
              compétences clés en cybersécurité grâce à des formations
              pratiques, des études de cas réels et un accompagnement
              personnalisé.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div className="relative -z-10 overflow-hidden">
            <Image
              alt="Formation cybersécurité"
              src={agency10}
              className="h-full w-full rounded-md"
            />
            <div className="absolute inset-0 rounded-md bg-black/40" />
          </div>
          <div className="lg:-ms-20">
            <div className="divide-y divide-default-200 rounded-md bg-default-50 shadow">
              <div className="flex flex-wrap items-center gap-6 p-6 sm:flex-nowrap">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md  border border-default-200 bg-white/5 text-xl text-default-950">
                    01
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-default-950">
                    Sécurité réseau
                  </h3>
                  <p className="mt-3 text-base">
                    Apprenez à protéger les infrastructures et à sécuriser les
                    échanges de données contre les cybermenaces.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 p-6 sm:flex-nowrap">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md  border border-default-200 bg-white/5 text-xl text-default-950">
                    02
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-default-950">
                    Analyse de vulnérabilités
                  </h3>
                  <p className="mt-3 text-base">
                    Identifiez, analysez et corrigez les failles de sécurité
                    pour renforcer la résilience de votre système d'information.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6 p-6 sm:flex-nowrap">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md  border border-default-200 bg-white/5 text-xl text-default-950">
                    03
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-default-950">
                    Gestion des incidents
                  </h3>
                  <p className="mt-3 text-base">
                    Apprenez à réagir efficacement face aux cyberattaques et à
                    mettre en place des plans de réponse adaptés.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services2;
