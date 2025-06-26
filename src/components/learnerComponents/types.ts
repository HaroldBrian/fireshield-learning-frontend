import type { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export type LearnerMenuType = {
  name: string;
  link: string;
  icon: IconType;
};

export type ProfileMenuType = {
  name: string;
  link: string;
  icon: IconType;
};

export type MessageType = {
  title: string;
  description: string;
  icon: IconType;
  variant: string;
};

export type AppType = {
  name: string;
  image: StaticImageData;
};
