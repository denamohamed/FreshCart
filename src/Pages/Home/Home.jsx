import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartComponent from '../../Component/CartComponent/CartComponent'
import Loading from '../../Component/Loading/Loading'
import HomeSlider from '../../Component/HomeSlider/HomeSlider'
import CategorySlider from '../../Component/CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
    let { data, isLoading, error } = useQuery({
        queryKey: ["Products"],
        queryFn: getAllProducts,
    })
    
    async function getAllProducts() {
        let options={
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/products"
        }
        return await axios.request(options)
    }
    if (isLoading) {
       return <Loading/>
    }

    return (
        
        <>
            <Helmet>
                <title>
                    Home
                </title>
            </Helmet>
            <>
                <HomeSlider />
                <CategorySlider />
                <div className=' grid grid-cols-12 gap-3 mb-7'>
                    {data.data.data.map((product) => (<CartComponent productInfo={product} key={product._id} />))}
                </div>
            </>
        </>
    )
}

