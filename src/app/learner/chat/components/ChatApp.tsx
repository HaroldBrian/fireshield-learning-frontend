'use client'
import { useState } from 'react'
import ChatArea from './ChatArea'
import ChatUsers from './ChatUsers'
import { users, type ChatUser } from '../data'

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState<ChatUser>(users[1])

  /**
   * On user change
   */
  const onUserChange = (user: ChatUser) => {
    setSelectedUser(user)
  }
  return (
    <section>
      <div className="container">
        <div className="my-6 space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ChatUsers
                onUserSelect={onUserChange}
                selectedUser={selectedUser}
              />
            </div>
            <div className="lg:col-span-2">
              <ChatArea selectedUser={selectedUser} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatApp
