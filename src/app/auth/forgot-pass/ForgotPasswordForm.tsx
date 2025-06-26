'use client'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
const ForgotPasswordForm = () => {
  const resetFormSchema = yup.object({
    email: yup.string().required('Please enter your email'),
  })
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resetFormSchema),
    defaultValues: {
      email: 'user@demo.com',
    },
  })
  return (
    <form onSubmit={handleSubmit(() => {})} className="mt-10 shrink">
      <TextFormInput
        containerClassName="mb-4"
        label="Email address"
        name="email"
        labelClassName="block text-base/normal text-zinc-200"
        className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
        placeholder="Enter your email"
        fullWidth
        control={control}
      />
      <div className="mb-6 flex flex-col justify-center gap-4">
        <button
          type="submit"
          className="relative inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-700"
        >
          Forgot Password
        </button>
        <Link
          href="/auth/sign-in"
          className="relative inline-flex w-full items-center justify-center rounded border border-primary px-6 py-3 text-base capitalize text-primary transition-all hover:bg-primary hover:text-white"
        >
          Go to Login
        </Link>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
