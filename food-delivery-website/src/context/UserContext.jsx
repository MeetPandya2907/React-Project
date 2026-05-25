import React, { createContext, useState } from 'react'
import { food_items } from '../food'
export const datacontext=createContext()

function UserContext({children}) {
    let [category,setCategory]=useState(food_items) 
    let [input,setInput]= useState("")
    let [showCart,setShowCart]=useState(false);
    let data={
        input,
        setInput,
        category,
        setCategory,
        showCart,
        setShowCart
    }
  return (
    <div>
        <datacontext.Provider value={data}>
      {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContext
