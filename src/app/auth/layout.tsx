import Image from "next/image";
import Link from "next/link";
import { type ReactNode, Suspense } from "react";

import authBgImg from "@/assets/images/other/auth-bg.jpg";
import otherAuthImg from "@/assets/images/other/auth-img.jpg";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat p-2 lg:p-0"
      style={{ backgroundImage: `url("${authBgImg.src}")` }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="flex h-screen w-full items-center justify-center">
        <div className="max-w-4xl overflow-hidden rounded-lg bg-black/60 backdrop-blur-3xl">
          <div className="grid lg:grid-cols-2">
            <div className="hidden py-2.5 ps-2.5 lg:block">
              <div className="relative h-full overflow-hidden rounded-md">
                <div className="absolute inset-0 bg-black/40" />
                <Image
                  alt="authImg"
                  src={otherAuthImg}
                  width={438}
                  height={702}
                  className="h-full max-w-full"
                />
              </div>
            </div>
            <div>
              <div className="flex h-full flex-col p-6">
                <Link href="/auth/sign-in" className="mb-8 block shrink">
                  <div className="flex items-center gap-1 select-none">
                    <span className="text-2xl font-bold text-white">
                      Fireshield
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      Learning
                    </span>
                  </div>
                </Link>

                <Suspense fallback={<div />}>{children}</Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
