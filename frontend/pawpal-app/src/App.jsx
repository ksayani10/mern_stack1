import React from 'react'
import './App.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodReceipe from './pages/AddFoodReceipe'
import EditReceipe from './pages/EditReceipe'
import ReceipeDetails from './pages/ReceipeDetails'


const getAllReceipes =async()=>
{
  let allReceipes= []
  await axios.get('http://localhost:5000/receipe').then(res =>{
    allReceipes =res.data
  })

  return allReceipes
}

const getMyReceipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allReceipes=await getAllReceipes()
  return allReceipes.filter(item=>item.createdBy===user._id)
}

const getFavReceipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const getReceipe=async({params})=>{
  let receipe;
  await axios.get(`http://localhost:5000/receipe/${params.id}`)
  .then(res=>receipe=res.data)

  await axios.get(`http://localhost:5000/user/${receipe.createdBy}`)
  .then(res=>{
    receipe={...receipe,email:res.data.email}
  })

  return receipe
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
    {path:"/",element:<Home/>,loader:getAllReceipes},
    {path:"/myReceipe",element:<Home/>,loader:getMyReceipes},
    {path:"/favReceipe",element:<Home/>,loader:getFavReceipes},
    {path:"/addReceipe",element:<AddFoodReceipe/>},
     {path:"/editReceipe/:id",element:<EditReceipe/>},
    {path:"/receipe/:id",element:<ReceipeDetails/>,loader:getReceipe}
  ]}
 
])
export default function App()
{

  return (
    <>
    <RouterProvider router ={router}> </RouterProvider>
    </>
  )
}