import ServicesMarquee from "@/components/ServicesMarquee";
import type { Metadata } from "next";
import TopNavBar from "@/components/TopNavBar";
import About from "./landing/agency/components/About";
import Blog from "./landing/agency/components/Blog";
import Contact from "./landing/agency/components/Contact";
import FAQs from "./landing/agency/components/FAQs";
import Home from "./landing/agency/components/Home";
import OurPortfolio from "./landing/agency/components/OurPortfolio";
import Services from "./landing/agency/components/Services";
import Services2 from "./landing/agency/components/Services2";
import { Footer } from "@/components";

export const metadata: Metadata = {
  title: "Fireshield Learning - Plateforme de formation en ligne",
};

const Agency = () => {
  return (
    <>
      <TopNavBar
        menuItems={[
          { key: "home", label: "Accueil" },
          { key: "about", label: "À propos" },
          { key: "services", label: "Formations" },
          { key: "portfolio", label: "Réalisations" },
          { key: "faq", label: "FAQ" },
          { key: "blog", label: "Blog" },
        ]}
        position="sticky"
        hasLoginButton
        hasRegisterButton
      />

      <Home />

      <section className="lg:pb-10">
        <ServicesMarquee />
      </section>

      <About />

      <Services />

      <OurPortfolio />

      <Services2 />

      <FAQs />

      <Blog />

      <Footer />
    </>
  );
};

export default Agency;
