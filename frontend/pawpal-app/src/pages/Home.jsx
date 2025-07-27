import React from 'react'

import foodreceipe from '../assets/foodreceipe.jpg'
import Receipeitems from '../components/Receipeitems'
import {useNavigate} from 'react-router-dom'


export default function Home()
{

    const navigate =useNavigate()
  return (
    <>
    
    <section className ='home'>
        <div className ='left'>
            <h1> Food Receipe </h1>
            <h5> A food recipe is more than just a set of instructions; it is a guide that helps transform simple 
                ingredients into delicious dishes. 
                Recipes provide the exact measurements, cooking times, and techniques required to create a meal. 
                Whether it’s a traditional family recipe passed down through generations or a new dish discovered online,
                 recipes allow anyone—from beginners to expert chefs—to prepare food with confidence. .</h5>

            <button onClick={() => navigate ("/addReceipe")}> Share your receipe </button>

        </div >
          <div className ='right'></div>
          <img src ={foodreceipe}  width ="320px" height ="300px"/> 

    </section>

    <div className ='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fill-opacity="1" d="M0,96L26.7,90.7C53.3,85,107,75,160,106.7C213.3,139,267,213,320,208C373.3,203,427,117,480,96C533.3,75,587,117,640,144C693.3,171,747,181,800,197.3C853.3,213,907,235,960,245.3C1013.3,256,1067,256,1120,218.7C1173.3,181,1227,107,1280,90.7C1333.3,75,1387,117,1413,138.7L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
    </div>
   

   <div className = 'receipe'>
        <Receipeitems/>
   </div>
    </>
  )
}