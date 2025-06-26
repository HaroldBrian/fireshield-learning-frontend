"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useLogin = () => {
  const router = useRouter();
  const { login: loginWithAuth, loading: authLoading } = useAuth();

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Veuillez entrer une adresse e-mail valide")
      .required("Veuillez entrer votre adresse e-mail"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Veuillez entrer votre mot de passe"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "hrldbrian@gmail.com",
      password: "Password@123",
    },
  });

  type LoginFormFields = yup.InferType<typeof loginFormSchema>;

  const login = handleSubmit(async (values: LoginFormFields) => {
    await loginWithAuth({ email: values.email, password: values.password });
  });

  return { loading: authLoading, login, control };
};

export default useLogin;
