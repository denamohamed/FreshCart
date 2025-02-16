import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Component/Loading/Loading'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {
    let {data , isLoading , error} = useQuery({
        queryKey : ['Brands'],
        queryFn : getAllBrands
    })
    async function getAllBrands(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }

if (isLoading) {
    return <Loading/>
}
  return (
    <>
    <Helmet>
        <title>
            Brands
        </title>
    </Helmet>
   
<div className='grid grid-cols-12 gap-6 my-8'>
    {data.data.data.map((brand)=>(
    <div  key={brand._id} className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md shadow-lg hover:scale-110 transition-transform hover:shadow-gray-700'>
        <img src={brand.image} className='w-full h-46'/>
        <p className='p-5 text-center font-semibold text-lg'>{brand.name}</p>
    </div>
    ))}
</div> 
   
    </>
  )
}

