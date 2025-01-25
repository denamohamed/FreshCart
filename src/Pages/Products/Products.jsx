import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import CartComponent from '../../Component/CartComponent/CartComponent'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'


export default function Products() {
    let {data,isLoading,error}=useQuery({
        queryKey:["Products page"],
        queryFn:getAllProducts
    })
    async function getAllProducts() {
         return await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

if (isLoading) {
    return <Loading/>
}
    return (
        <>
        <Helmet>
            <title>
                Products
            </title>
        </Helmet>
                <div className=' grid grid-cols-12 gap-3 mb-7'>
                    {data.data.data.map((product) => (<CartComponent productInfo={product} key={product._id} />))}
                </div>
        </>
    )
}


