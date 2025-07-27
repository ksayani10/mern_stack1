import React from 'react'
import profileImg from '../assets/profile.webp'
//import foodreceipe from '../assets/foodreceipe.jpg'
import { useLoaderData } from 'react-router-dom'

export default function ReceipeDetails() {
    const receipe=useLoaderData()
    console.log(receipe)
  return (
   <>
    <div className='outer-container'>
        <div className='profile'>
            <img src={profileImg} width="50px" height="50px"></img>
            <h5>{receipe.email}</h5>
        </div>
        <h3 className='title'>{receipe.title}</h3>
        <img src={`http://localhost:5000/images/${receipe.coverImage}`} width="220px" height="200px"></img>
        <div className='recipe-details'>
            <div className='ingredients'><h4>Ingredients</h4><ul>{receipe.ingredients.map(item=>(<li>{item}</li>))}</ul></div>
            <div className='instructions'><h4>Instructions</h4><span>{receipe.instructions}</span></div>
        </div>
    </div>
   </>
  )
}