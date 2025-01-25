import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../Component/Loading/Loading'
import ImageGallery from "react-image-gallery";
import { cartContext } from '../../Context/cart.context';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
    let [productDetails, setProductDetails] = useState(null)
    let { id } = useParams()
    let { addProductToCart } = useContext(cartContext)

    async function getProductDetails() {
        let { data } = await axios.request({
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: "GET"
        })
        setProductDetails(data.data)
    }

    const images = productDetails?.images.map((imageURL) => ({
        original: imageURL,
        thumbnail: imageURL,
    }
    ))

    useEffect(() => {
        getProductDetails()
    }, [])

    return (
        <>
            {productDetails ?
                (<div className='grid grid-cols-12 my-4 gap-5'>
                    <Helmet>
                        <title>
                            {productDetails.title}
                        </title>
                    </Helmet>
                    <div className='col-span-12 md:col-span-4'>
                        <ImageGallery items={images} showNav={false} showPlayButton={false} />
                    </div>
                    <div className='col-span-12 md:col-span-8'>
                        <h3 className='font-semibold text-xl'>{productDetails.title}</h3>
                        <span className='text-primary font-semibold'>{productDetails.category.name}</span>
                        <p className='text-slate-500 my-2'>{productDetails.description}</p>
                        <p><span className='text-primary'>Brand :</span> {productDetails.brand.name}</p>
                        <div className='flex justify-between items-center mt-2 mb-4'>
                            <p><span className='text-primary'>Remaining :</span> {productDetails.quantity}</p>
                            <p><span className='text-primary'>Sold :</span> {productDetails.sold}</p>
                        </div>
                        <div className='flex justify-between items-center my-2'>
                            <p>{productDetails.price} EGP</p>
                            <div className='flex gap-2 items-center'>
                                <i className="text-yellow-400 fa-solid fa-star ms-1"></i>
                                <p>{productDetails.ratingsAverage}</p>
                            </div>
                        </div>
                        <button className='btn-primary w-full mt-5' onClick={() => {
                            addProductToCart({ id })
                        }}>
                            Add To Cart
                        </button>
                    </div>
                </div>
                ) : (<Loading />)}

        </>
    )
}
