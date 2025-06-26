import type { StaticImageData } from 'next/image'
import { IconType } from 'react-icons'

export type SlideType = {
  name: string
  title: string
  description: string
}

export type ServiceType = {
  icon: IconType
  title: string
  description: string
}

export type PortfolioSlideType = {
  title: string
  subTitle: string
  image: StaticImageData
}

export type FaqType = {
  title: string
  description: string
}

export type BlogType = {
  title: string
  description: string
  no: string
  image: StaticImageData
}
