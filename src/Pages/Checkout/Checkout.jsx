import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { userContext } from "../../Context/user.context"
import { cartContext } from '../../Context/cart.context'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'

export default function Checkout() {
let {token} = useContext(userContext)
let {cartInfo , setCartInfo , getUserCart} = useContext(cartContext)
let [orderType, setOrderType]=useState('')
let Navigate = useNavigate()

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        city: "",
        phone: "",
        details: ""
      },      
  },
  onSubmit : (values)=>{
    if (orderType == "cash") {
      createCashOrder(values)
    }
    else{
      createOnlineOrder(values)
    }
  }
})

  async function createCashOrder(values) {
    let {data}= await axios.request({
      url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
      method:"POST",
      headers: {
        token 
      },
      data : {
        values
      }
      
    })
    console.log(data)
    setCartInfo([])
    getUserCart()
    toast.success("Redirecting to orders page")
    setTimeout(() => {
      Navigate("/allorders")
    }, 2000);
  }

  async function createOnlineOrder(values) {
    try{
    let {data}= await axios.request({
      url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
      method:"POST",
      headers: {
        token 
      },
      data : {
        values
      }
    })
    if (data.status == "success") {
      toast.loading("Redirecting to payment gateway")
      setTimeout(() => {
        window.location.href = data.session.url;
      }, 2000);
      console.log(data)
}}catch(error){
  console.log(error)
}
  }

  return (
    <>
    <Helmet>
      <title>Checkout</title>
    </Helmet>
      <h2 className="text-2xl font-bold">Shipping Address</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 p-5">
        <input type="text" className="form-control w-full" placeholder="City"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <input type="tel" className="form-control w-full" placeholder="Phone"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <textarea placeholder="Details" className="form-control w-full"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setOrderType('cash')}
            type="submit"
            className="btn-primary bg-blue-400 border-0 p-2"
          >
            Cash Order
          </button>
          <button
            onClick={() => setOrderType('online')}
            type="submit"
            className="btn-primary border-0 p-2"
          >
            Online Payment
          </button>
        </div>
      </form>
    </>
  )
}
