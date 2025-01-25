import React from 'react'
import NotFound from "../../assets/images/error.svg"
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return (
    <>
    <Helmet>
      <title>
        Not Found
      </title>
    </Helmet>
    <img src={NotFound} alt='NotFound !' className='mx-auto'/>
    <h1 className='text-4xl text-primary font-bold text-center my-5'>NOT FOUND PAGE!!</h1>
    </>
  )
}
