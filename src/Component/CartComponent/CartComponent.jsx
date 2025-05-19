import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cart.context';
import { wishlistContext } from '../../Context/wishList.context';

export default function CartComponent({ productInfo }) {
    const { addProductToCart } = useContext(cartContext)
    const { addToWishList ,removeFromWishList, isProductInWishlist} = useContext(wishlistContext);

    let { imageCover, category, price, title, ratingsAverage, quantity, brand, id } = productInfo;


    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
      setInWishlist(isProductInWishlist(id));
    }, [isProductInWishlist, id]);
  
    const handleWishlistToggle = () => {
      if (inWishlist) {
        removeFromWishList(id);
      } else {
        addToWishList({ id });
      }
      setInWishlist(!inWishlist);
    };
  
    return (
        <>
            <div className='overflow-hidden rounded-md shadow-lg col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 '>
                <div className='relative'>
                    <img src={imageCover} alt="product image" className='w-full ' />
                    <div className='layer absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300'>

                        <div className='flex justify-center items-center w-full h-full gap-3'>
                            <span className='hover:scale-110 hover:rotate-6 transition-transform duration-300 w-10 h-10 bg-primary flex justify-center items-center rounded-full text-white'  
                            onClick={() => {
                                handleWishlistToggle()
                            }}
                            >
                                <i className={`fa-solid fa-heart ${inWishlist ? 'text-red-500' : 'text-white'}`} ></i>
                            </span>
                            <span className='hover:scale-110 hover:rotate-6 transition-transform duration-300 w-10 h-10 bg-primary flex justify-center items-center rounded-full text-white'>
                                <Link className=" fa-solid cursor-pointer fa-cart-shopping" onClick={() => {
                                    addProductToCart({ id })
                                }}></Link>
                            </span>
                            <span className='hover:scale-110 hover:rotate-6 transition-transform duration-300 w-10 h-10 bg-primary flex justify-center items-center rounded-full text-white'>
                                <Link className=" fa-solid cursor-pointer fa-eye" to={`/products/${id}`} ></Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='p-3'>
                    <h3 className='text-primary  text-lg'>{category.name}</h3>
{/*                     <p className='text-sm text-slate-500 pb-2 '>Brand : {brand.name}</p> */}
                    <p className=' font-semibold pb-2 ' >{title.split('', 20).join("")}</p>
                    <p className='text-primary text-xs'>Quantaty : {quantity}</p>
                    <div className='flex justify-between items-center mt-5 my-2'>
                        <span>{price} EGP</span>
                        <div className='flex gap-1 items-center'>
                            <i className="fa-solid fa-star text-yellow-500"></i>
                            <span>{ratingsAverage}</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

