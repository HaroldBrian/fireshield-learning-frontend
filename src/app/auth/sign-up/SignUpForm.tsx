"use client";
import TextFormInput from "@/components/form/TextFormInput";
import PasswordFormInput from "@/components/form/PasswordFormInput";
import CustomButton from "@/app/learner/ui-components/components/shared/CustomButton";
import useRegister from "./useRegister";

const SignUpForm = () => {
  const { loading, register, control } = useRegister();

  return (
    <form onSubmit={register} className="shrink">
      <TextFormInput
        containerClassName="mb-4"
        label="Nom complet"
        name="lastName"
        labelClassName="block text-base/normal text-zinc-200"
        className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        fullWidth
        placeholder="Entrez votre nom complet"
        control={control}
      />
      <TextFormInput
        containerClassName="mb-4"
        label="Prénom"
        name="firstName"
        labelClassName="block text-base/normal text-zinc-200"
        className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        fullWidth
        placeholder="Entrez votre prénom"
        control={control}
      />
      <TextFormInput
        containerClassName="mb-4"
        label="Adresse e-mail"
        name="email"
        labelClassName="block text-base/normal text-zinc-200"
        className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        placeholder="Entrez votre adresse e-mail"
        fullWidth
        control={control}
      />
      <PasswordFormInput
        label="Mot de passe"
        containerClassName="mb-4"
        name="password"
        labelClassName="block text-base/normal text-zinc-200"
        placeholder="Entrez votre mot de passe"
        fullWidth
        className="block w-full rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        control={control}
      />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-1 gap-y-2">
        <div className="inline-flex items-center">
          <input
            type="checkbox"
            className="size-4 rounded border-white/20 bg-white/20 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary/60 focus:ring-offset-0"
            id="checkbox-signup"
          />
          <label
            className="ms-2 select-none align-middle text-base/none text-zinc-200"
            htmlFor="checkbox-signup"
          >
            Se souvenir de moi
          </label>
        </div>
      </div>

      <CustomButton type="submit" loading={loading} className="mt-5 w-full">
        S&apos;inscrire
      </CustomButton>
    </form>
  );
};

export default SignUpForm;
