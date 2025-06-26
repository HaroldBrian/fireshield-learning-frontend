import type { Metadata } from "next";
import { REM } from "next/font/google";
import { type ReactNode } from "react";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import "@/assets/css/style.css";
import AppProvidersWrapper from "@/components/AppsProviderWrapper";
import BackToTop from "@/components/BackToTop";

import("preline/preline");

const rem = REM({
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fireshield Learning - Plateforme de formation en ligne",
    template: "%s | Fireshield Learning - Plateforme de formation en ligne",
  },
  description:
    "Fireshield Learning - Plateforme de formation en ligne dédiée à la cybersécurité, offrant des cours variés pour tous les niveaux. Nos formations sont conçues pour vous aider à maîtriser les compétences essentielles en cybersécurité, que vous soyez débutant ou professionnel. Rejoignez-nous pour apprendre auprès d’experts et améliorer vos compétences en sécurité informatique.",
};

const splashScreenStyles = `
#splash-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  background: white;
  display: flex;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: all 15s linear;
  overflow: hidden;
}

#splash-screen.remove {
  animation: fadeout 0.7s forwards;
  z-index: 0;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <style>{splashScreenStyles}</style>
      </head>

      <body className={rem.className}>
        <div id="splash-screen">
          <Image
            alt="Logo"
            width={355}
            height={83}
            src={"/logo-dark.png"}
            style={{ height: "10%", width: "auto" }}
          />
        </div>
        <NextTopLoader color="#ea580c" showSpinner={false} />
        <div id="__next_splash">
          <AppProvidersWrapper>
            {children}
            <BackToTop />
            <Toaster richColors />
          </AppProvidersWrapper>
        </div>
      </body>
    </html>
  );
}
