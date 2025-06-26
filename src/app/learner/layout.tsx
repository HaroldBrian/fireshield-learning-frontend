"use client";
import { type ReactNode, Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";

import("preline/preline");

const Footer = dynamic(() => import("@/components/learnerComponents/Footer"));
const TopBar = dynamic(() => import("@/components/learnerComponents/TopBar"));

const loading = () => <div />;

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const token = Cookies.get("auth-token");
  const { user } = useAuth();
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    if (user || token) {
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, [user, token]);

  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("bg-default-50");
    return () => {
      document.body.classList.remove("bg-default-50");
    };
  }, []);

  if (status == "unauthenticated") {
    router.replace("/auth/sign-in");
    return null;
  }

  if (status == "loading") {
    return <NextTopLoader color="#ea580c" showSpinner={false} />;
  }

  return (
    <>
      <Suspense fallback={loading()}>
        <TopBar />
      </Suspense>

      <Suspense fallback={loading()}>{children}</Suspense>

      <Suspense fallback={loading()}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Layout;
