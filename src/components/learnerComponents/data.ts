import {
  LuOctagonAlert,
  LuMessagesSquare,
  LuRadar,
  LuShieldOff,
  LuCalendar,
  LuTrophy,
  LuCirclePlay,
  LuSettings,
  LuUser,
  LuNewspaper,
  LuMessageCircle,
  LuHeart,
} from "react-icons/lu";
import type {
  LearnerMenuType,
  ProfileMenuType,
  AppType,
  MessageType,
} from "./types";

import github from "@/assets/images/brand/github.png";
import bitbucket from "@/assets/images/brand/bitbucket.png";
import dropbox from "@/assets/images/brand/dropbox.png";
import slack from "@/assets/images/brand/slack.png";
import dribble from "@/assets/images/brand/dribbble.png";
import behance from "@/assets/images/brand/behance.png";

const learnerMenu: LearnerMenuType[] = [
  {
    name: "Tableau de bord",
    link: "/learner/dashboard",
    icon: LuRadar,
  },
  {
    name: "Mes formations",
    link: "/learner/my-courses",
    icon: LuCirclePlay,
  },
  {
    name: "Planning",
    link: "/learner/schedule",
    icon: LuCalendar,
  },
  {
    name: "Évaluations",
    link: "/learner/quizzes",
    icon: LuTrophy,
  },
  {
    name: "Messagerie",
    link: "/learner/chat",
    icon: LuMessagesSquare,
  },
];

const profileMenuItems: ProfileMenuType[] = [
  { icon: LuUser, name: "Mon profil", link: "/learner/profile" },
  { icon: LuHeart, name: "Favoris", link: "/learner/favorites" },
  { icon: LuTrophy, name: "Certificats", link: "/learner/certificates" },
  { icon: LuSettings, name: "Paramètres", link: "/learner/settings" },
];

const messages: MessageType[] = [
  {
    title: "À vérifier !",
    description: "Merci de vérifier ce fichier.",
    variant: "primary",
    icon: LuOctagonAlert,
  },
  {
    title: "Félicitations !",
    description: "Votre système a été mis à jour avec succès.",
    variant: "teal-500",
    icon: LuShieldOff,
  },
  {
    title: "Une erreur est survenue",
    description: "Un problème est survenu dans votre code.",
    variant: "red-500",
    icon: LuShieldOff,
  },
];

const apps: AppType[] = [
  {
    name: "GitHub",
    image: github,
  },
  {
    name: "Bitbucket",
    image: bitbucket,
  },
  {
    name: "Dropbox",
    image: dropbox,
  },
  {
    name: "Slack",
    image: slack,
  },
  {
    name: "Dribble",
    image: dribble,
  },
  {
    name: "Behance",
    image: behance,
  },
];

export { learnerMenu, profileMenuItems, messages, apps };
