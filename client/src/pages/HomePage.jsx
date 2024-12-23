import React from 'react'
import { useChatStore } from '../store/useChatStore'
import SideBar from '../components/SideBar'
import WelcomeChat from '../components/WelcomeChat'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  
  const { selectedUser } = useChatStore()

  return (
    <>
    <div><SideBar /></div>
    {!selectedUser ? <WelcomeChat /> : <ChatContainer />}
    </>
  )
}

export default HomePage