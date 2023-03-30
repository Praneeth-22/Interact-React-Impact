import React from 'react'
import '../Chat/style.scss';
import Slidebar from './Component/Slidebar';
import Chat from './Component/Chat';
const Home = () => {
  return (
    <div className="home"> 
    <div className="container">
      <Slidebar />
      <Chat />
    </div>
      
    </div>
  )
}

export default Home
