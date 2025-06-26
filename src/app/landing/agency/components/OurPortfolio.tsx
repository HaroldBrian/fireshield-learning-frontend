import ProjectSwiper from "@/components/ProjectSwiper";
import { portfolioSlides } from "../data";

const OurPortfolio = () => {
  return (
    <section id="portfolio" className="pb-10 pt-20">
      <div className="mb-10 flex items-end justify-between">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-md border border-primary bg-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            Réalisations
          </span>
          <h2 className="my-4 text-4xl font-medium capitalize text-default-950">
            Projets et cas pratiques en cybersécurité
          </h2>
        </div>
      </div>
      <div>
        <ProjectSwiper slides={portfolioSlides} bgBlack />
      </div>
    </section>
  );
};

export default OurPortfolio;
