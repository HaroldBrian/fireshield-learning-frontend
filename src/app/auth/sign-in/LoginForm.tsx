"use client";
import TextFormInput from "@/components/form/TextFormInput";
import PasswordFormInput from "@/components/form/PasswordFormInput";
import useLogin from "./useLogin";
import Link from "next/link";
import CustomButton from "@/app/learner/ui-components/components/shared/CustomButton";

const LoginForm = () => {
  const { loading, login, control } = useLogin();

  return (
    <form className="shrink" onSubmit={login}>
      <TextFormInput
        containerClassName="mb-4"
        label="Adresse e-mail"
        name="email"
        placeholder="Entrez votre adresse e-mail"
        labelClassName="block text-base/normal text-zinc-200"
        className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        fullWidth
        control={control}
      />

      <PasswordFormInput
        label="Mot de passe"
        containerClassName="mb-4"
        name="password"
        placeholder="Entrez votre mot de passe"
        labelClassName="block text-base/normal text-zinc-200"
        fullWidth
        className="block w-full rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        control={control}
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-1 gap-y-2">
        <div className="inline-flex items-center">
          <input
            type="checkbox"
            className="size-4 rounded border-white/20 bg-white/20 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary/60 focus:ring-offset-0"
            id="checkbox-signin"
          />
          <label
            className="ms-2 select-none align-middle text-base/none text-zinc-200"
            htmlFor="checkbox-signin"
          >
            Se souvenir de moi
          </label>
        </div>
        <Link
          href="/auth/forgot-pass"
          className="border-b border-dashed text-zinc-200"
        >
          <small>Mot de passe oublié&nbsp;?</small>
        </Link>
      </div>

      <CustomButton type="submit" loading={loading} className="mt-5 w-full">
        Se connecter
      </CustomButton>
    </form>
  );
};

export default LoginForm;
