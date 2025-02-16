import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../../Component/Loading/Loading'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'


export default function Categories() {
    let [categories, setCategories] = useState(null)
    let{data , isLoading , error}=useQuery({
        queryKey : ["Categories Page"],
        queryFn :getAllCategories
    })

    async function getAllCategories() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
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
                Categories
            </title>
        </Helmet>
             <div className='grid grid-cols-12 gap-6 my-6'>
                {data.data.data.map((category) => (
                    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-md shadow-lg hover:shadow-gray-700 hover:scale-110 cursor-pointer' key={category._id}>
                        <img src={category.image} className='w-full h-64 object-contain'/>
                        <p className='p-5 text-center font-semibold text-lg'>{category.name}</p>
                    </div>
                ))

                }
            </div>
        </>
    )
}

