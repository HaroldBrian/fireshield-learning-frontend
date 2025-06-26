import ThirdPartyAuth from "@/components/ThirdPartyAuth";
import Link from "next/link";
import LoginForm from "./LoginForm";

const SignIn = () => {
  return (
    <>
      <LoginForm />

      <ThirdPartyAuth />

      <p className="shrink text-center text-zinc-200">
        Vous n&apos;avez pas de compte ?
        <Link href="/auth/sign-up" className="ms-1 text-primary">
          <b>Créer un compte</b>
        </Link>
      </p>
    </>
  );
};

export default SignIn;
