'use client'
import dynamic from 'next/dynamic'
const FloatingMenu = dynamic(() => import('./components/FloatingMenu'), { ssr: false })
export default FloatingMenu
