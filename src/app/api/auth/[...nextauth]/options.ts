import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { randomBytes } from 'crypto'
import type { IUser } from '@/types/user'

export const fakeUsers: IUser[] = [
  {
    id: '1',
    email: 'admin@coderthemes.com',
    username: 'admin',
    password: 'password',
    firstName: 'Admin',
    lastName: 'Coderthemes',
    token:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InN1cHBvcnRAY29kZXJ0aGVtZXMuY29tIiwibGFzdE5hbWUiOiJDb2RlcnRoZW1lcyIsImVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJyb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJBZG1pbiJ9.QdtQ1rfYxYIqVVu2_9x2SdAy4pBFM0oNGzkavbBUPj-kt_ADBzjRPdD1YC_CRCJj7IFJIsMhj6RNf8dk-8SlXg',
  },
  {
    id: '2',
    email: 'user@coderthemes.com',
    username: 'user',
    password: 'password',
    firstName: 'User',
    lastName: 'Coderthemes',
    token:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InN1cHBvcnRAY29kZXJ0aGVtZXMuY29tIiwibGFzdE5hbWUiOiJDb2RlcnRoZW1lcyIsImVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJyb2xlIjoidXNlciIsImZpcnN0TmFtZSI6InVzZXIifQ.KjRo-V9prEFFFvWsT9mlCxNcw-MbaiAwRbJY5wSciSr0Ydvbe4yAFwv4KAYa7QBJAnon4vMdNJ3cfdw0JyjcHA',
  },
]

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email:',
          type: 'text',
          placeholder: 'Enter your username',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials, req) {
        const filteredUser = fakeUsers.find((user) => {
          return (
            user.email === credentials?.email &&
            user.password === credentials?.password
          )
        })
        if (filteredUser) {
          return filteredUser
        } else {
          throw new Error('Email or Password is not valid')
        }
      },
    }),
  ],
  secret: 'kvwLrfri/MBznUCofIoRH9+NvGu6GqvVdqO3mor1GuA=',
  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },

    session: ({ session, token }) => {
      session.user = {
        email: 'user@demo.com',
        name: 'Test User',
      }
      return Promise.resolve(session)
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomBytes(32).toString('hex')
    },
  },
}
