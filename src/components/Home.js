import React from 'react'
import "../components/css/Home.css";
import video from "../components/video/home.mp4"
import { Helmet } from 'react-helmet';
export default function Home() {
  
  return (

    
    <div>
      <Helmet>
  <title>Home | Toshan Bakery</title>
</Helmet>
      <div className="home">
     
   <div className="video">
   <video autoPlay loop muted className="w-full h-full object-cover">
           <source src={video} type="video/mp4" />
           Your browser does not support the video tag.
      </video>
     
      
   </div>
 </div>
 </div>
  )
}
