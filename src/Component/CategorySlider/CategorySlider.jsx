import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'


export default function CategorySlider() {
    let {data , isLoading ,error}=useQuery({
        queryKey : ["Category"],
        queryFn : getAllCategories
    })

    async function getAllCategories() {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET"
        }
        return await axios.request(options)
    }

if (isLoading) {
    return <Loading/>
}
    return (
        <>
            <section className='pb-8'>
                <h2 className='font-semibold text-2xl my-6 '>Shop Populer Categories :</h2>
                <swiper-container loop={true} slides-per-view={5}>
                    {data.data.data.map((category) => (
                        <swiper-slide key={category._id}>
                            <Link to={`/categories/${category._id}`}>
                            <img src={category.image} className='w-full h-72 object-cover cursor-pointer' />
                            <h3 className='text-center mt-2 font-bold'>{category.name}</h3>
                            </Link>
                        </swiper-slide>
                    )
                    )}
                </swiper-container>
            </section>
        </>
    )
}
