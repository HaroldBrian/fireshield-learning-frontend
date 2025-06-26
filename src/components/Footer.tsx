/* eslint-disable react/no-unescaped-entities */
'use client'
import { footerLinks } from '@/assets/data'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { LuMoveRight } from 'react-icons/lu'
import * as yup from 'yup'

import { TextFormInput } from '@/components'
import Link from 'next/link'

const Footer = () => {
  const subscribeFormSchema = yup.object({
    email: yup
      .string()
      .email('Veuillez entrer un email valide')
      .required('Veuillez entrer votre email'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(subscribeFormSchema),
  })
  return (
    <footer>
      <div className="border-y border-default-200">
        <div className="container py-20">
          <div className="grid gap-10 md:grid-cols-3 lg:gap-16 xl:grid-cols-5">
            <div className="md:col-span-3 xl:col-span-2">
              <div>
                <Link href="/">
                  <div className="flex items-center gap-1 select-none">
                    <span className="text-2xl font-bold text-default-950">
                      Fireshield
                    </span>
                      <span className="text-2xl font-bold text-primary">
                        Learning
                      </span>
                  </div>
                </Link>
                <p className="mt-6  text-base">
                  Fireshield Learning est une plateforme dédiée à l'apprentissage de la cybersécurité, offrant des ressources et des formations pour aider les professionnels à se préparer aux défis de la sécurité numérique.
                </p>
                <form
                  onSubmit={handleSubmit(() => {})}
                  className="mt-6 space-y-2"
                >
                  <TextFormInput
                    name="email"
                    type="email"
                    fullWidth
                    className="h-12 w-full rounded-lg bg-default-100 py-4 pe-16 ps-4 text-default-950 placeholder:text-default-600"
                    placeholder="Entrez votre email"
                    endButton={
                      <button
                        type="submit"
                        className="absolute end-[6px] top-[6px] inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary/20 px-6 text-primary transition-all duration-500 hover:bg-primary hover:text-white"
                      >
                        <LuMoveRight className="h-6 w-6" />
                      </button>
                    }
                    control={control}
                  />
                </form>
              </div>
            </div>
            {footerLinks.map((item, idx) => {
              return (
                <div key={idx}>
                  <ul className="flex flex-col gap-3">
                    <h5 className="mb-2 font-medium text-default-800 lg:text-lg xl:text-xl">
                      {item.title}
                    </h5>
                    {item.items.map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <Fragment key={idx}>
                          {Icon ? (
                            <li className="group flex items-center gap-5">
                              <Link
                                href={`${item.link ? item.link : ''}`}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-default-300 text-default-800 transition-all duration-700 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                              >
                                <Icon className="h-5 w-5" />
                              </Link>
                              <h5 className="text-base font-medium text-default-800">
                                {item.name}
                              </h5>
                            </li>
                          ) : (
                            <li>
                              <Link
                                href={`${item.link ? item.link : ''}`}
                                className="text-base text-default-700 transition-all hover:text-default-950"
                              >
                                {item.name}
                              </Link>
                            </li>
                          )}
                        </Fragment>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="container flex h-full flex-wrap items-center justify-center text-center md:justify-between md:text-start">
          <p className="text-base text-default-900">
            {new Date().getFullYear()} © Fireshield Learning. Développé avec&nbsp;
            <span className="text-red-500">❤️</span> par&nbsp;
            <Link
              className="text-primary-700"
              href="https://fireshielsec.com/"
              target="_blank"
            >
              Fireshield Security
            </Link>
          </p>
          <p className="text-base">
            <Link href="/mentions-legales">Mentions légales &amp; politique</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
