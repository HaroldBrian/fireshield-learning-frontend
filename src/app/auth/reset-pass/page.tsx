import { ThirdPartyAuth } from '@/components'
import Link from 'next/link'
import ResetPasswordForm from './ResetPasswordForm'

const ResetPassword = () => {
  return (
    <>
      <ResetPasswordForm />
      <ThirdPartyAuth />
      <p className="shrink text-center text-zinc-200">
        Back To ?
        <Link href="/auth/sign-in" className="ms-1 text-primary">
          <b>Login</b>
        </Link>
      </p>
    </>
  )
}

export default ResetPassword
