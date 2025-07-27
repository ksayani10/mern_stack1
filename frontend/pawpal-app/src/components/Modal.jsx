import React ,{onClose} from "react" 
import  {children} from "react"
import InputForm from "./InputForm"

export default function Modal({children ,onClose}) {
  return (
     <>
        <div className='backdrop'onClick={onClose}></div>
            <dialog className='modal' open>
                {children}
            </dialog>
        
    </>
  )
}
