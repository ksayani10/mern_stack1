import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
//import foodImg from '../assets/foodReceipe.png'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function ReceipeItems() {
    const receipes = useLoaderData()
    const [allReceipes, setAllReceipes] = useState()
    let path = window.location.pathname === "/myReceipe" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavReceipe, setIsFavReceipe] = useState(false)
    const navigate=useNavigate()
    console.log(allReceipes)

    useEffect(() => {
        setAllReceipes(receipes)
    }, [receipes])

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/receipe/${id}`)
            .then((res) => console.log(res))
        setAllReceipes(receipes => receipes.filter(receipe => receipe._id !== id))
        let filterItem = favItems.filter(receipe => receipe._id !== id)
        localStorage.setItem("fav", JSON.stringify(filterItem))
    }

    const favReceipe = (item) => {
        let filterItem = favItems.filter(receipe => receipe._id !== item._id)
        favItems = favItems.filter(recipe => receipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavReceipe(pre => !pre)
    }

    return (
        <>
            <div className='card-container'>
                {
                    allReceipes?.map((item, index) => {
                        return (
                            <div key={index} className='card'onDoubleClick={()=>navigate(`/receipe/${item._id}`)}>
                                <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px"></img>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill />{item.time}</div>
                                        {(!path) ? <FaHeart onClick={() => favReceipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} /> :
                                            <div className='action'>
                                                <Link to={`/editReceipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}