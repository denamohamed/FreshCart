import React, { useEffect, useState } from 'react'
import { useContext } from "react"
import { userContext } from "../../Context/user.context"
import Loading from '../../Component/Loading/Loading'
import { cartContext } from '../../Context/cart.context';
import { Link, Navigate } from 'react-router-dom'
import { wishlistContext } from '../../Context/wishList.context'
import { Helmet } from 'react-helmet';

export default function WishList() {

    const { addProductToCart } = useContext(cartContext)
    const { addToWishList, getUserWishList, removeFromWishList, wishListInfo, isProductInWishlist } = useContext(wishlistContext);

    return (
        <>
        <Helmet>
            <title>
                Wishlist
            </title>
        </Helmet>
            <>


                {wishListInfo ?
                    (<section className='bg-slate-100 p-5 rounded my-6'>
                        <h2 className='text-2xl font-bold'>
                            WishList
                            <i className="fa-solid fa-heart text-red-500 ms-2"></i> :
                        </h2>
                        {wishListInfo?.length === 0 ?
                            (<div className='py-16 flex items-center justify-center flex-col gap-3' >
                                <p className='text-lg'>
                                    There are no items yet!
                                </p>
                                <Link className='btn-primary' to={"/"}>ADD PRODUCTS TO WISHLIST</Link>
                            </div>) :
                            (<>



                                <div className=' grid grid-cols-12 gap-3 my-7'>
                                    {wishListInfo?.map((product) => (
                                        <div className='overflow-hidden rounded-md shadow-lg col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 ' key={product._id}>
                                            <div className='relative'>

                                                <img src={product?.imageCover} alt="product image" className='w-full ' />
                                                <div className='layer absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300'>

                                                    <div className='flex justify-center items-center w-full h-full gap-3'>
                                                        <span className='hover:scale-110 hover:rotate-6 transition-transform duration-300 w-10 h-10 bg-primary flex justify-center items-center rounded-full text-white'
                                                            onClick={() => {
                                                                removeFromWishList(product._id)
                                                            }}
                                                        >
                                                            <i className={` fa-solid cursor-pointer fa-heart text-red-500`} ></i>
                                                        </span>
                                                        <span className='hover:scale-110 hover:rotate-6 transition-transform duration-300 w-10 h-10 bg-primary flex justify-center items-center rounded-full text-white'>
                                                            <span className=" fa-solid cursor-pointer fa-cart-shopping" onClick={() => {
                                                                addProductToCart({id: product._id })
                                                            }}></span>
                                                        </span>
                                                        <span className='hover:scale-110 hover:rotate-6 transition-transform duration-300 w-10 h-10 bg-primary flex justify-center items-center rounded-full text-white'>
                                                            <Link className=" fa-solid cursor-pointer fa-eye" to={`/products/${product._id}`} ></Link>
                                                        </span>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className='p-3'>
                                                <h3 className='text-primary  text-lg'>{product?.category?.name}</h3>
                                                <p className='text-sm text-slate-500 pb-2 '>Brand :{product?.brand?.name} </p>
                                                <p className=' font-semibold pb-2 ' >{product?.title?.split('', 20).join("")}</p>
                                                <div className='flex justify-between items-center mt-5 my-2'>
                                                    <span>{product?.price} EGP</span>
                                                    <div className='flex gap-1 items-center'>
                                                        <i className="fa-solid fa-star text-yellow-500"></i>
                                                        <span>{product?.ratingsAverage}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </>)}


                    </section>) : (<Loading />)}

            </>



        </>
    )
}
