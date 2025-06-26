import Link from "next/link";
import Image from "next/image";
import { LuArrowUpRight, LuComponent, LuLayers } from "react-icons/lu";
import agency3 from "@/assets/images/landing/agency/img-3.jpg";
import agency4 from "@/assets/images/landing/agency/img-4.jpg";
import agency5 from "@/assets/images/landing/agency/img-5.jpg";

const About = () => {
  return (
    <section id="about" className="py-10 lg:py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-md border border-primary bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              À propos
            </span>
            <h2 className="my-4 text-4xl font-medium capitalize text-default-950">
              À propos de Fireshield Learning
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
          <div className="grid items-center gap-6 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Image
                  alt="Sécurité informatique"
                  src={agency3}
                  className="h-full max-w-full rounded-lg"
                />
              </div>
              <div>
                <Image
                  alt="Formation cybersécurité"
                  src={agency4}
                  className="h-full max-w-full rounded-lg"
                />
              </div>
            </div>
            <div>
              <Image
                alt="Expert cybersécurité"
                src={agency5}
                className="h-full max-w-full rounded-lg"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-medium text-default-950">
              L&apos;excellence en formation cybersécurité
            </h2>
            <div className="mt-10  flex justify-center gap-6">
              <div>
                <LuComponent className="h-10 w-10 text-default-950" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-default-950">
                  Expertise reconnue
                </h2>
                <p className="mt-4 text-base">
                  Nos parcours sont conçus par des experts du domaine pour
                  répondre aux besoins actuels de la sécurité informatique.
                </p>
              </div>
            </div>
            <div className="my-10 flex justify-center gap-6">
              <div>
                <LuLayers className="h-10 w-10 text-default-950" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-default-950">
                  Apprentissage pratique
                </h2>
                <p className="mt-4 text-base">
                  Mettez en pratique vos connaissances grâce à des ateliers, des
                  cas concrets et des laboratoires virtuels.
                </p>
              </div>
            </div>
            <Link
              href="/blog"
              className="inline-flex justify-center gap-2 rounded-md border border-default-200 px-6 py-2 text-default-950 transition-all duration-500 hover:bg-primary hover:text-white"
            >
              Découvrir nos formations
              <LuArrowUpRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
