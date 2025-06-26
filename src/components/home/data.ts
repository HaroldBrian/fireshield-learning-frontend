import {
  LuAirplay,
  LuCircuitBoard,
  LuFeather,
  LuFigma,
  LuFileText,
  LuGlobe,
  LuMove,
  LuPackage,
  LuStar,
  LuSunMoon,
  LuUser,
} from 'react-icons/lu'

import { type IconType } from 'react-icons'

import tailwind from '@/assets/images/demo/logo/tailwindcss.svg'
import html5 from '@/assets/images/demo/logo/html.svg'
import css3 from '@/assets/images/demo/logo/css.svg'
import javascript from '@/assets/images/demo/logo/javascript.svg'
import bun from '@/assets/images/demo/logo/bun.svg'
import yarn from '@/assets/images/demo/logo/yarn.svg'
import vite from '@/assets/images/demo/logo/vitejs-logo.svg'

import agency from '@/assets/images/demo/agency.png'
import agencyDark from '@/assets/images/demo/agency-dark.png'
import agency2 from '@/assets/images/demo/agency-2.png'
import agencyDark2 from '@/assets/images/demo/agency-2-dark.png'
import charity from '@/assets/images/demo/charity.png'
import charityDark from '@/assets/images/demo/charity-dark.png'
import company from '@/assets/images/demo/company.png'
import companyDark from '@/assets/images/demo/company-dark.png'
import creative from '@/assets/images/demo/creative.png'
import creativeDark from '@/assets/images/demo/creative-dark.png'
import ebook from '@/assets/images/demo/ebook.png'
import ebookDark from '@/assets/images/demo/ebook-dark.png'
import finance from '@/assets/images/demo/finance.png'
import financeDark from '@/assets/images/demo/finance-dark.png'
import hosting from '@/assets/images/demo/hosting.png'
import hostingDark from '@/assets/images/demo/hosting-dark.png'
import marketing from '@/assets/images/demo/marketing.png'
import marketingDark from '@/assets/images/demo/marketing-dark.png'
import marketing2 from '@/assets/images/demo/marketing-2.png'
import marketingDark2 from '@/assets/images/demo/marketing-2-dark.png'
import marketing3 from '@/assets/images/demo/marketing-3.png'
import marketingDark3 from '@/assets/images/demo/marketing-3-dark.png'
import photography from '@/assets/images/demo/photography.png'
import photographyDark from '@/assets/images/demo/photography-dark.png'
import portfolio from '@/assets/images/demo/portfolio.png'
import portfolioDark from '@/assets/images/demo/portfolio-dark.png'
import portfolio2 from '@/assets/images/demo/portfolio-2.png'
import portfolioDark2 from '@/assets/images/demo/portfolio-2-dark.png'
import startup from '@/assets/images/demo/startup.png'
import startupDark from '@/assets/images/demo/startup-dark.png'

import dashboard from '@/assets/images/demo/admin-dashboard.png'
import dashboardDark from '@/assets/images/demo/admin-dashboard-dark.png'
import chat from '@/assets/images/demo/admin-chat.png'
import chatDark from '@/assets/images/demo/admin-chat-dark.png'
import project from '@/assets/images/demo/admin-project.png'
import projectDark from '@/assets/images/demo/admin-project-dark.png'

import authLogin from '@/assets/images/demo/auth-login.png'
import authRegister from '@/assets/images/demo/auth-register.png'
import authLogout from '@/assets/images/demo/auth-logout.png'
import authForgot from '@/assets/images/demo/auth-recoverpw.png'
import authReset from '@/assets/images/demo/auth-reset-password.png'
import type { StaticImageData } from 'next/image'

type DevelopmentToolType = {
  logo: string
  name: string
}

export type DemoType = {
  name: string
  lightImage: StaticImageData
  darkImage: StaticImageData
  link: string
}

type FeatureType = {
  title: string
  description: string
  icon: IconType | string
}

const developmentTools: DevelopmentToolType[] = [
  {
    name: 'Tailwindcss',
    logo: tailwind,
  },
  {
    name: 'HTML5',
    logo: html5,
  },
  {
    name: 'CSS3',
    logo: css3,
  },
  {
    name: 'Javascript',
    logo: javascript,
  },
  {
    name: 'Bun',
    logo: bun,
  },
  {
    name: 'Yarn',
    logo: yarn,
  },
  {
    name: 'ViteJs',
    logo: vite,
  },
]

const landingDemos: DemoType[] = [
  {
    name: 'Agency',
    lightImage: agency,
    darkImage: agencyDark,
    link: '/landing/agency',
  },
  {
    name: 'Agency Two',
    lightImage: agency2,
    darkImage: agencyDark2,
    link: '/landing/agency-2',
  },
  {
    name: 'Charity',
    lightImage: charity,
    darkImage: charityDark,
    link: '/landing/charity',
  },
  {
    name: 'Company',
    lightImage: company,
    darkImage: companyDark,
    link: '/landing/company',
  },
  {
    name: 'Creative',
    lightImage: creative,
    darkImage: creativeDark,
    link: '/landing/creative',
  },
  {
    name: 'Ebook',
    lightImage: ebook,
    darkImage: ebookDark,
    link: '/landing/ebook',
  },
  {
    name: 'Finance',
    lightImage: finance,
    darkImage: financeDark,
    link: '/landing/finance',
  },
  {
    name: 'Hosting',
    lightImage: hosting,
    darkImage: hostingDark,
    link: '/landing/hosting',
  },
  {
    name: 'Marketing',
    lightImage: marketing,
    darkImage: marketingDark,
    link: '/landing/marketing',
  },
  {
    name: 'Marketing 2',
    lightImage: marketing2,
    darkImage: marketingDark2,
    link: '/landing/marketing-2',
  },
  {
    name: 'Marketing 3',
    lightImage: marketing3,
    darkImage: marketingDark3,
    link: '/landing/marketing-3',
  },
  {
    name: 'Photography',
    lightImage: photography,
    darkImage: photographyDark,
    link: '/landing/photography',
  },
  {
    name: 'Portfolio',
    lightImage: portfolio,
    darkImage: portfolioDark,
    link: '/landing/portfolio',
  },
  {
    name: 'Portfolio 2',
    lightImage: portfolio2,
    darkImage: portfolioDark2,
    link: '/landing/portfolio-2',
  },
  {
    name: 'Startup',
    lightImage: startup,
    darkImage: startupDark,
    link: '/landing/startup',
  },
]

const adminDemos: DemoType[] = [
  {
    name: 'Dashboard',
    lightImage: dashboard,
    darkImage: dashboardDark,
    link: '/admin/dashboard',
  },
  {
    name: 'Chat',
    lightImage: chat,
    darkImage: chatDark,
    link: '/admin/chat',
  },
  {
    name: 'Project',
    lightImage: project,
    darkImage: projectDark,
    link: '/admin/project',
  },
]

const authDemos: DemoType[] = [
  {
    name: 'Sign In',
    link: '/auth/sign-in',
    lightImage: authLogin,
    darkImage: authLogin,
  },
  {
    name: 'Sign Up',
    link: '/auth/sign-up',
    lightImage: authRegister,
    darkImage: authRegister,
  },
  {
    name: 'Logout',
    link: '/auth/logout',
    lightImage: authLogout,
    darkImage: authLogout,
  },
  {
    name: 'Forgot Password',
    link: '/auth/forgot-pass',
    lightImage: authForgot,
    darkImage: authForgot,
  },
  {
    name: 'Reset Password',
    link: '/auth/reset-pass',
    lightImage: authReset,
    darkImage: authReset,
  },
]

const allFeatures: FeatureType[] = [
  {
    title: 'Built With Tailwind CSS',
    description:
      'Rapidly build modern websites without ever leaving your HTML.',
    icon: tailwind,
  },
  {
    title: 'Ultra Responsive',
    description:
      'Our fully Responsive design ensures your content is beautifully presented no matter what device your audience is using.',
    icon: LuAirplay,
  },
  {
    title: 'Dark Mode Support',
    description:
      'Embark on a Rich Experience: Unveiling a Host of Advanced Features within Our Dark Mode Support Environment.',
    icon: LuSunMoon,
  },
  {
    title: 'Production Ready',
    description:
      'Our solutions have undergone extensive testing to ensure they can handle the demands of a production environment.',
    icon: LuPackage,
  },
  {
    title: 'Hygienic Design',
    description:
      'Our designs feature smooth and continuous surfaces, minimizing areas where dirt, bacteria, or contaminants can accumulate.',
    icon: LuFigma,
  },
  {
    title: 'High Performance',
    description:
      'We understand that your requirements are unique. Our high-performance solutions are customizable to match your specific goals.',
    icon: LuCircuitBoard,
  },
  {
    title: 'Multi Browser Support',
    description:
      'Our e-commerce store is rigorously tested and optimized to work flawlessly on all major web browsers, offering a consistent shopping experience to all our customers.',
    icon: LuGlobe,
  },
  {
    title: 'Well Documented',
    description:
      "Our documentation is a treasure trove of valuable information, from getting started guides to advanced tutorials. It's all there to help you make the most of our services.",
    icon: LuFileText,
  },
  {
    title: 'Great Support',
    description:
      "Our support team is always ready to help. Whether you have questions, encounter issues, or need guidance, we're just a message or call away.",
    icon: LuUser,
  },
  {
    title: 'Highly Customizable',
    description:
      "Our product is designed to adapt to your specific requirements. Whether you're an individual, a business, or an organization, we provide the tools to customize it to your liking.",
    icon: LuMove,
  },
  {
    title: 'Light as a Feather',
    description:
      "From our years of experience and expertise in Development, we know users vary, they could have slow of fast network. They all deserve seamless experience in shopping with you. That's why our product is developed with fewer lines.",
    icon: LuFeather,
  },
  {
    title: 'UX Considered',
    description:
      "A good design does not need any explanation because a good design can speak for itself. Out app doesn't only have a good User Interface, we also have considered User experience.",
    icon: LuStar,
  },
]

export { developmentTools, landingDemos, adminDemos, allFeatures, authDemos }
