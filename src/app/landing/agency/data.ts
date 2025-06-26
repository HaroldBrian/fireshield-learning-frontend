import { LuComponent, LuLayers, LuLayoutGrid } from "react-icons/lu";
import type {
  BlogType,
  FaqType,
  PortfolioSlideType,
  ServiceType,
  SlideType,
} from "./types";

import agency6 from "@/assets/images/landing/agency/img-6.jpg";
import agency7 from "@/assets/images/landing/agency/img-7.jpg";
import agency8 from "@/assets/images/landing/agency/img-8.jpg";
import agency9 from "@/assets/images/landing/agency/img-9.jpg";
import agency13 from "@/assets/images/landing/agency/img-13.jpg";
import agency14 from "@/assets/images/landing/agency/img-14.jpg";
import agency15 from "@/assets/images/landing/agency/img-15.jpg";

const homeSwiperSlides: SlideType[] = [
  {
    title: "Cybersécurité",
    name: "Fireshield Learning : développez vos compétences",
    description:
      "Plateforme de formation en cybersécurité : parcours certifiants, ateliers pratiques, accompagnement par des experts et communauté engagée.",
  },
  {
    title: "Protection des données",
    name: "Maîtrisez les fondamentaux de la sécurité informatique",
    description:
      "Apprenez à sécuriser vos données et à anticiper les menaces grâce à des modules interactifs et des études de cas réels.",
  },
  {
    title: "Carrière en cybersécurité",
    name: "Boostez votre avenir professionnel",
    description:
      "Obtenez des certifications reconnues et rejoignez un secteur en pleine croissance avec l'accompagnement de nos experts.",
  },
  {
    title: "Communauté et accompagnement",
    name: "Rejoignez un réseau d'apprenants passionnés",
    description:
      "Partagez, échangez et progressez au sein d'une communauté active, avec des retours personnalisés et des ateliers collaboratifs.",
  },
];

const services: ServiceType[] = [
  {
    title: "Sécurité réseau",
    description:
      "Apprenez à protéger les infrastructures et à sécuriser les échanges de données contre les cybermenaces.",
    icon: LuComponent,
  },
  {
    title: "Analyse de vulnérabilités",
    description:
      "Identifiez, analysez et corrigez les failles de sécurité pour renforcer la résilience de votre système d'information.",
    icon: LuLayers,
  },
  {
    title: "Gestion des incidents",
    description:
      "Réagissez efficacement face aux cyberattaques et mettez en place des plans de réponse adaptés.",
    icon: LuLayoutGrid,
  },
];

const portfolioSlides: PortfolioSlideType[] = [
  {
    title: "Audit de sécurité",
    subTitle: "Analyse de systèmes réels",
    image: agency6,
  },
  {
    title: "Test d'intrusion",
    subTitle: "Simulation d'attaque",
    image: agency7,
  },
  {
    title: "Sensibilisation",
    subTitle: "Ateliers pratiques",
    image: agency8,
  },
  {
    title: "Gestion de crise",
    subTitle: "Réponse à incident",
    image: agency9,
  },
];

const faqContents: FaqType[] = [
  {
    title: "Pourquoi se former à la cybersécurité ?",
    description:
      "La cybersécurité est un enjeu majeur pour toutes les organisations. Se former permet de mieux protéger ses données et de répondre aux nouveaux défis numériques.",
  },
  {
    title: "Quels sont les prérequis pour suivre une formation ?",
    description:
      "Nos parcours sont accessibles à tous les niveaux, du débutant à l'expert. Chaque formation précise ses prérequis éventuels.",
  },
  {
    title: "Les formations sont-elles certifiantes ?",
    description:
      "Oui, la plupart de nos parcours délivrent une certification reconnue dans le secteur de la cybersécurité.",
  },
  {
    title: "Proposez-vous un accompagnement personnalisé ?",
    description:
      "Oui, nos experts accompagnent chaque apprenant tout au long de son parcours, avec des ateliers pratiques et des retours personnalisés.",
  },
];

const blogs: BlogType[] = [
  {
    title: "Les tendances de la cybersécurité en 2024",
    description:
      "Découvrez les nouvelles menaces et les meilleures pratiques pour protéger vos systèmes en 2024.",
    no: "01",
    image: agency13,
  },
  {
    title: "Comment réussir sa reconversion en cybersécurité ?",
    description:
      "Parcours, conseils et témoignages pour se lancer dans une carrière porteuse et sécuriser son avenir.",
    no: "02",
    image: agency14,
  },
  {
    title: "L'importance de la sensibilisation en entreprise",
    description:
      "Former ses équipes est la première défense contre les cyberattaques. Découvrez nos ateliers et retours d'expérience.",
    no: "03",
    image: agency15,
  },
];

export { homeSwiperSlides, services, portfolioSlides, faqContents, blogs };
