'use client'
import TextFormInput from '@/components/form/TextFormInput'
import { cn } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  LuDownload,
  LuPaperclip,
  LuPhone,
  LuSend,
  LuTrash,
  LuUsers,
  LuVideo,
} from 'react-icons/lu'
import * as yup from 'yup'
import { messages, type ChatMessage, type ChatUser } from '../data'

import avatar1 from '@/assets/images/avatars/img-1.jpg'

const UserMessage = ({
  message,
  toUser,
}: {
  message: ChatMessage
  toUser: ChatUser
}) => {
  return (
    <div
      className={`${message.from.id === toUser.id ? 'ms-auto  flex-row-reverse  text-end' : 'text-start'} group flex w-11/12 items-start gap-3`}
    >
      <div className="text-center">
        <Image
          alt="avatar"
          src={message.from.avatar}
          width={32}
          height={32}
          className="h-8 rounded-md"
        />
        <p className="pt-0.5 text-xs">{message.sendOn}</p>
      </div>
      {message.message.type === 'text' && (
        <div
          className={cn(
            'max-w-3/4 rounded p-3',
            message.from.id === toUser.id ? 'bg-primary' : 'bg-default-100'
          )}
        >
          <p
            className={cn(
              'relative text-xs font-bold',
              message.from.id === toUser.id
                ? 'block text-white'
                : 'text-default-700'
            )}
          >
            {message.from.name}
          </p>
          <p
            className={cn(
              'pt-1',
              message.from.id === toUser.id && 'text-white/90'
            )}
          >
            {message.message.value}
          </p>
        </div>
      )}

      {message.message.type === 'file' && (
        <div className="mt-3 rounded border border-default-200">
          <div className="p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-12">
                  <span className="inline-flex h-full w-full items-center justify-center rounded bg-primary text-white">
                    .ZIP
                  </span>
                </div>
                <div className="text-start text-default-400">
                  <Link href="" className="text-sm font-bold">
                    {message.message.value.file}
                  </Link>
                  <p className="text-sm">{message.message.value.size}</p>
                </div>
              </div>
              <Link href="" className="btn !text-xl">
                <LuDownload />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ChatArea = ({ selectedUser }: { selectedUser: ChatUser }) => {
  const [userMessages, setUserMessages] = useState<ChatMessage[]>([])

  const toUser = useMemo(() => {
    return {
      id: 9,
      name: 'Diane B',
      avatar: avatar1,
    }
  }, [])

  /*
   *  Fetches the messages for selected user
   */
  const getMessagesForUser = useCallback(() => {
    if (selectedUser) {
      setUserMessages(
        [...messages].filter(
          (m) =>
            (m.to.id === toUser.id && m.from.id === selectedUser.id) ||
            (toUser.id === m.from.id && m.to.id === selectedUser.id)
        )
      )
    }
  }, [selectedUser, toUser])

  useEffect(() => {
    getMessagesForUser()
  }, [getMessagesForUser])

  /*
   * form validation schema
   */
  const schemaResolver = yup.object({
    newMessage: yup.string().required('Please enter your message'),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schemaResolver),
  })

  /**
   * sends the chat message
   */
  const sendChatMessage = (values: { newMessage: string }) => {
    const newUserMessages = [...userMessages]
    newUserMessages.push({
      id: userMessages.length + 1,
      from: toUser,
      to: selectedUser,
      message: { type: 'text', value: values.newMessage },
      sendOn: new Date().getHours() + ':' + new Date().getMinutes(),
    })
    setTimeout(() => {
      const otherNewMessages = [...newUserMessages]
      otherNewMessages.push({
        id: userMessages.length + 1,
        from: selectedUser,
        to: toUser,
        message: { type: 'text', value: values.newMessage },
        sendOn: new Date().getHours() + ':' + new Date().getMinutes(),
      })
      setUserMessages(otherNewMessages)
    }, 1000)
    setUserMessages(newUserMessages)
    reset()
  }

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (
        elementRef &&
        elementRef.current &&
        elementRef.current.scrollIntoView
      ) {
        elementRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    })
    return <div ref={elementRef} />
  }
  return (
    <div className="w-full overflow-hidden rounded-xl border border-default-200 bg-white dark:bg-default-50">
      <div className="border-b border-default-200 px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3 py-1.5">
          <div className="sm:w-7/12">
            <div className="flex items-center gap-2">
              <Image
                src={selectedUser.avatar}
                width={36}
                height={36}
                className="me-2 h-9 rounded-full"
                alt="Brandon Smith"
              />
              <div>
                <h5 className="text-base font-medium text-default-700">
                  {selectedUser.name}
                </h5>
                <p className="mt-1.5 flex items-center text-xs text-default-400">
                  <small className="ti ti-circle-filled me-1 text-red-400" />
                  Offline
                </p>
              </div>
            </div>
          </div>
          <div className="w-auto">
            <Link href="" className="inline-block p-1.5">
              <LuPhone size={18} className="text-default-900" />
            </Link>
            <Link href="" className="inline-block p-1.5">
              <LuVideo size={18} className="text-default-900" />
            </Link>
            <Link href="" className="inline-block p-1.5">
              <LuUsers size={18} className="text-default-900" />
            </Link>
            <Link href="" className="inline-block p-1.5">
              <LuTrash size={18} className="text-default-900" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-480px)] overflow-y-auto p-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
        <div className="space-y-4">
          {userMessages.map((message, idx) => (
            <UserMessage key={idx} message={message} toUser={toUser} />
          ))}
          <AlwaysScrollToBottom />
        </div>
      </div>
      <div className="border-t border-default-200 bg-white p-6 dark:bg-default-50">
        <form
          name="chat-form"
          className="flex items-center gap-2"
          onSubmit={handleSubmit(sendChatMessage)}
        >
          <TextFormInput
            name="newMessage"
            className="rounded border-none bg-default-100 text-default-900 placeholder:text-default-600 focus:ring-primary"
            placeholder="Enter your text"
            control={control}
            fullWidth
            noValidate
            autoFocus
          />
          <div className="flex w-auto gap-1">
            <Link
              href=""
              className="rounded bg-default-200 px-3 py-3 text-default-800 hover:bg-default-800/20"
            >
              <LuPaperclip />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 rounded bg-primary px-3 py-2 text-white transition-all duration-300 hover:bg-primary-700">
              Send <LuSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatArea
