import { AdminBreadcrumb } from '@/components'
import ChatApp from './components/ChatApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat',
}

const Chat = () => {
  return (
    <>
      <AdminBreadcrumb title="Chat" />
      <ChatApp />
    </>
  )
}

export default Chat
