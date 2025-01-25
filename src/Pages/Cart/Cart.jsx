import React, { useEffect, useState } from 'react'
import { useContext } from "react"
import { userContext } from "../../Context/user.context"
import Loading from '../../Component/Loading/Loading'
import { Link, Navigate } from 'react-router-dom'
import { cartContext } from '../../Context/cart.context'
import { Helmet } from 'react-helmet'

export default function Cart() {
  let { token } = useContext(userContext)

  const {    cartInfo , removeCartItem , updateCount , getUserCart ,clearCart } = useContext(cartContext);
  return (
    <>
    <Helmet>
      <title>
        Cart
      </title>
    </Helmet>
      {cartInfo ? (
        <>
          <section className='bg-slate-100 p-5 rounded my-6'>
            <h2 className='text-2xl font-bold'>
              Shop Cart
              <i className="fa-solid fa-cart-shopping text-lg ms-2 text-primary"></i> :
            </h2>

            { cartInfo.data?.products?.length === 0  ? (
              <div className='py-16 flex items-center justify-center flex-col gap-3'>
                <p className='text-lg'>
                  There are no items yet!
                </p>
                <Link className='btn-primary' to={"/"}>ADD YOUR FIRST PRODUCT TO CART</Link>
              </div>
            ) : (
              <div>
                <p className='text-primary text-lg py-2 font-semibold'>Total Cart Price : <span className='text-black'>{cartInfo.data?.totalCartPrice}</span></p>
                { cartInfo.data?.products.map((product) => (
                  <div className="grid grid-cols-12 py-2" key={product._id}>
                    <div className='col-span-1 p-1'>
                      <img src={product.product.imageCover} className='w-full' />
                    </div>
                    <div className='col-span-11 flex flex-col justify-center ps-3'>
                      <div className='flex justify-between'>
                        <p>{product.product.title}</p>
                        <div>
                          <button className='p-1 btn-primary text-white' onClick={() => {
                            updateCount({ id: product.product.id, count: product.count + 1 })
                          }}>
                            <i className='fa-solid fa-plus'></i></button>
                          <span className='px-2'>{product.count}</span>
                          <button className='p-1 btn-primary text-white'><i className='fa-solid fa-minus'  onClick={() => {
                            updateCount({ id: product.product.id, count: product.count - 1 })
                          }}></i></button>
                        </div>
                      </div>
                      <p className='text-primary'>Price: <span className='text-black'>{product.price}</span></p>
                      <button className='self-start mt-3 btn-primary bg-red-500 border-none' onClick={() => {
                        removeCartItem({ id: product.product.id })
                      }}>
                        <i className='fa-solid fa-trash-can pe-1'></i>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            { cartInfo.data?.products?.length === 0 ? ("") : (
              <div className='flex justify-end'>
                <button  className='btn-primary bg-red-500 border-none m-2' onClick={() => { clearCart() }}>CLEAR CART</button>
              </div>

            )}

          </section>
          { cartInfo.data?.products?.length === 0 ? ("") : (

          <div className='flex justify-end mb-6'>
            <Link to={"/checkout"}  className='btn-primary'>Next step →</Link >
          </div>)}
        </>
      ) : (<Loading />)}
    </>
  )
}


