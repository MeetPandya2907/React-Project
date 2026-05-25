import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import Categories from '../Categories'
import Card from '../components/Card'
import { food_items } from '../food'
import { datacontext } from '../context/UserContext'
import { ImCross } from "react-icons/im";
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
export default function Home() {
  let {category,setCategory,input,showCart,setShowCart}= useContext(datacontext)
  function filters(category1){
    if(category1=="All"){
      setCategory(food_items)
    }else{
      let formatted_cat= category1.toLowerCase().replace(" ","_");
      let newlist= food_items.filter((item)=> (item.food_category==formatted_cat))
      setCategory(newlist)
    }
  }
  let items=useSelector(state=>state.cart)
  let subtotal= items.reduce((total,item)=> (total + item.price) * item.qty ,0)
  let delivaryfee= 20;
  let taxes= subtotal * 0.5/100;
  let total= Math.floor(subtotal + delivaryfee + taxes);
  
  return (
    <div className='bg-slate-200  w-full min-h-screen '>
      <Nav />
      {!input ? (<div className='flex items-center justify-center flex-wrap gap-5 w-[100%]'>
        {Categories.map((item)=>{
         return <div className='w-[140px] h-[150px] i bg-white flex flex-col items-center gap-5 p-5 text-[16px] font-bold text-gray-600 rounded-lg shadow-xl hover:bg-green-100 cursor-pointer transition-all duration-200' key={item.id} onClick={()=> filters(item.name)}>
            
            {item.image}
            {item.name}
          </div>
        
        })}
      </div> ) : null }
      <div className='flex flex-wrap gap-5 justify-center m-5 p-4'>
        {category.length>0 ? (category.map((items)=>{
          return <Card name={items.food_name} id={items.id} price={items.price} type={items.food_type} image={items.food_image}  />
        })) : <div className='flex flex-col items-center my-[190px]'>
          <span className='text-2xl text-gray-500 font-bold'>No Items Found</span>
          <a className='text-lg text-green-700 cursor-pointer ' href="">Try Better One..</a>
        </div> }
        
      </div>
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 overflow-scroll right-0 bg-white shadow-xl p-6 transition-all duration-500  ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <header className='w-[100%] flex justify-between items-center'>
          <span className='text-green-400 text-[18px] font-semibold'>Order Items  </span>
          <ImCross className='w-[20px] h-[20px] text-green-400 cursor-pointer hover:text-gray-600' onClick={()=> setShowCart(false)} />
        </header>
        {items.length>0 ? <div>

        <div className='w-full mt-9 flex flex-col gap-8'> 
          {items.map((item)=>{
            return <Card2 name={item.name} price={item.price} image={item.image} id={item.id} qty={item.qty} />
          })}
        </div>
        <div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
          
          <div className='w-full flex justify-between items-center'>
            <span className='text-xl text-gray-600 font-semibold'>SubTotal : </span>
            <span className='text-green-400 font-semibold text-lg'>Rs {subtotal}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-xl text-gray-600 font-semibold'>DelivaryFee : </span>
            <span className='text-green-400 font-semibold text-lg'>Rs {delivaryfee}/-</span>
          </div>
          <div className='w-full flex justify-between items-center'>
            <span className='text-xl text-gray-600 font-semibold'>Taxes : </span>
            <span className='text-green-400 font-semibold text-lg'>Rs {taxes}/-</span>
          </div>
          
        </div>
        <div className='w-full flex justify-between items-center px-8 py-2'>
            <span className='text-xl text-gray-600 font-semibold'>Total : </span>
            <span className='text-green-400 font-semibold text-lg'>Rs {total}/-</span>
          </div>
          <button className='w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-all my-8'>Place Order</button>
        </div> : <div className='flex flex-col justify-self-auto my-[190px] items-center'>
          <span className='text-gray-500 text-2xl font-bold'>Your Cart Is Empty</span>
          <a className='w-full p-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-all my-8 items-center flex justify-center cursor-pointer' href='' >Continue Shopping</a>
        </div> }
        
      </div>
    </div>
  )
}
