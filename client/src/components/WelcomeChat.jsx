import React from 'react';
import '../sass/components/welcomeChat.scss';

const WelcomeChat = () => {
  return (
    <>
    <div className="welcome-container">
     <img src="/message.png" alt="message" height={400} width={'auto'}/>
     <h1>Welcome to Mingle</h1>
     <h3>select a contact to start conversation</h3>
    </div>
    </>
  )
}

export default WelcomeChat