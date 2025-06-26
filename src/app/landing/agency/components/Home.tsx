"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { Thumbs, Controller, Autoplay, EffectFade } from "swiper/modules";

import { homeSwiperSlides } from "../data";

import bgLineImg from "@/assets/images/other/bg-lines-1.svg";

import agency1 from "@/assets/images/landing/agency/img-1.jpg";
import agency2 from "@/assets/images/landing/agency/img-2.jpg";
import agency3 from "@/assets/images/landing/agency/img-3.jpg";

import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

const swiperImages = [agency1, agency2, agency3];

function getFrenchTitle(title: string) {
  if (title === "Business") return "Formation professionnelle";
  if (title === "Marketing") return "Marketing digital";
  if (title === "Design") return "Design créatif";
  return title;
}
function getFrenchName(name: string) {
  if (name === "Grow Your Business")
    return "Développez vos compétences avec Fireshield Learning";
  if (name === "Digital Marketing Solutions")
    return "Maîtrisez le marketing digital avec nos experts";
  if (name === "Creative Design Agency")
    return "Libérez votre créativité grâce à nos formations";
  return name;
}
function getFrenchDescription(description: string) {
  if (
    description === "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  )
    return "Rejoignez la plateforme de formation en ligne qui propulse votre carrière et vos compétences vers l&apos;excellence.";
  if (description === "Suspendisse potenti. Nullam ac urna eu felis dapibus.")
    return "Des parcours adaptés à tous les niveaux, conçus par des professionnels reconnus.";
  if (description === "Praesent sapien massa, convallis a pellentesque nec.")
    return "Apprenez à votre rythme, où vous voulez et quand vous voulez.";
  return description;
}

const Home = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <section
      id="home"
      className={"bg-cover bg-no-repeat"}
      style={{ backgroundImage: `url(${bgLineImg.src})` }}
    >
      <div className="relative grid grid-cols-1 items-center xl:grid-cols-5">
        <div className="relative z-10 order-2 -mt-24 p-6 xl:order-none xl:col-span-2 xl:-me-24 xl:mt-0 xl:p-0">
          <div className="mx-auto max-w-xl rounded-xl bg-default-100 dark:bg-default-50 xl:me-0 xl:ms-auto">
            <div className="p-6">
              <Swiper
                speed={1000}
                spaceBetween={10}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                watchSlidesProgress
                modules={[Thumbs, Controller, Autoplay]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                loop
                className="mySwiper2 relative"
              >
                {homeSwiperSlides.map((item, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="flex flex-col items-start justify-end xl:h-full">
                        <span className="text-base font-medium uppercase tracking-wider text-default-800">
                          {getFrenchTitle(item.title)}
                        </span>
                        <h2 className="mt-6 text-3xl font-semibold text-default-950 md:text-4xl/snug">
                          {getFrenchName(item.name)}
                        </h2>
                        <p className="mb-7 mt-5  text-base md:w-3/4">
                          {getFrenchDescription(item.description)}
                        </p>
                        <Link
                          href="/courses"
                          className="inline-flex items-center justify-center gap-2 rounded-md border border-default-200 px-6 py-2 text-default-950 transition-all duration-300 hover:bg-primary hover:text-white"
                        >
                          Explorer les formations
                          <LuArrowUpRight className="h-6 w-6" />
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="order-1 xl:order-none xl:col-span-3">
          <Swiper
            onSwiper={setThumbsSwiper}
            speed={1000}
            watchSlidesProgress={true}
            loop={false}
            effect="fade"
            modules={[Thumbs, EffectFade]}
            className="mySwiper"
          >
            {swiperImages.map((image, idx) => {
              return (
                <SwiperSlide key={idx} className="relative">
                  <Image alt="heroImg" src={image} className="h-full w-full" />
                  <div className="absolute inset-0 bg-black/25" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Home;
