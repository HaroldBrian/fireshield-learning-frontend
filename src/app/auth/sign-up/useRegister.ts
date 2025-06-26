"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useRegister = () => {
  const router = useRouter();
  const { register: registerWithAuth, loading: authLoading } = useAuth();

  const registerFormSchema = yup.object({
    firstName: yup
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(50, "Le prénom ne doit pas dépasser 50 caractères")
      .required("Veuillez entrer votre prénom"),
    lastName: yup
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .max(50, "Le nom ne doit pas dépasser 50 caractères")
      .required("Veuillez entrer votre nom de famille"),
    email: yup
      .string()
      .email("Veuillez entrer une adresse e-mail valide")
      .required("Veuillez entrer votre adresse e-mail"),
    password: yup
      .string()
      .required("Veuillez entrer votre mot de passe")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),
  });   

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      firstName: "harold",
      lastName: "brian",
      email: "hrldbrian@gmail.com",
      password: "Password@123",
    },
  });

  type RegisterFormFields = yup.InferType<typeof registerFormSchema>;

  const register = handleSubmit(async (values: RegisterFormFields) => {
    const registerRequest = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    return await registerWithAuth(registerRequest);
  });

  return { loading: authLoading, register, control };
};

export default useRegister;
