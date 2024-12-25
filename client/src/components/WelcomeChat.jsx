import React from 'react';
import '../sass/components/welcomeChat.scss';

const WelcomeChat = () => {
  return (
    <>
    <div className="welcome-container">
     <img src="/welcome-chat.svg" alt="welcome-img" height={'280em'} width={'auto'}/>
     <h1>Welcome to Mingle</h1>
     <h3>select a contact to start conversation</h3>
    </div>
    </>
  )
}

export default WelcomeChat