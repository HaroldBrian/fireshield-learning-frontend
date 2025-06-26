'use client'
import logoutImg from '@/assets/images/other/logout.png'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

const Logout = () => {

  useEffect(() => {
    async function logoutUser () {
      await signOut({ redirect: false })
    }
    logoutUser()
  }, [])

  return (
    <>
      <div className="my-auto text-center">
        <h4 className="mb-4 text-2xl font-bold text-white">See you Again!</h4>
        <p className="mx-auto mb-5 max-w-sm text-default-300">
          You are now successfully sign out.
        </p>
        <div className="flex items-start justify-center">
          <Image
            alt="logoutImg"
            src={logoutImg}
            width={160}
            height={160}
            className="h-40"
          />
        </div>
      </div>
      <p className="shrink text-center text-zinc-200">
        Already have an account ?
        <Link href="/auth/sign-in" className="ms-1 text-primary">
          <b>Login</b>
        </Link>
      </p>
    </>
  )
}

export default Logout
