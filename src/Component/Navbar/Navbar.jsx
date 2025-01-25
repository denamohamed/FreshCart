import React, { useEffect } from 'react'
import Logo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../../Context/user.context'
import { cartContext } from '../../Context/cart.context'
export default function Navbar() {
    let { token, Logout } = useContext(userContext)
    const { cartInfo , getUserCart} = useContext(cartContext);

    useEffect(() => {
        getUserCart();
      }, []);
    
    return (
        <>
            <nav className='bg-slate-100 fixed top-0 left-0 right-0 z-10 py-5 '>
                <div className='container flex justify-between justify-items-center'>
                    <h1>
                        <img src={Logo} alt='freshcart logo' />
                    </h1>

                    {token ? (
                        <ul className='flex gap-5 items-center'>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/products'>Products</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/categories'>Categories</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/brands'>Brands</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/allorders'>Orders</NavLink>
                            </li>
                        </ul>) : ('')}



                    <ul className='flex gap-5 items-center'>
                        <li>
                            <a href='https://www.facebook.com'>
                                <i className='fa-brands fa-facebook'></i>
                            </a>
                        </li>
                        <li>
                            <a href='https://www.instagram.com'>
                                <i className='fa-brands fa-instagram'></i>
                            </a>
                        </li>
                        <li>
                            <a href='https://www.twitter.com'>
                                <i className='fa-brands fa-twitter'></i>
                            </a>
                        </li>
                        <li>
                            <a href='https://www.tiktok.com'>
                                <i className='fa-brands fa-tiktok'></i>
                            </a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com'>
                                <i className='fa-brands fa-linkedin'></i>
                            </a>
                        </li>
                        <li>
                            <a href='https://www.youtube.com'>
                                <i className='fa-brands fa-youtube'></i>
                            </a>
                        </li>

                    </ul>

                    <ul className='flex gap-5 items-center'>
                        <li>
                            <Link to="/wishlist">
                                <i className="fa-solid fa-heart text-lg"></i>
                            </Link>
                        </li>
                        <li>
                            <Link className='relative' to='/cart'>
                                <i className="fa-solid fa-cart-shopping text-lg"></i>
                                <span className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-sm flex justify-center items-center bg-primary w-5 h-4 rounded-full text-white font-semibold'>
                                    {cartInfo == null ? (
                                         <i className="fa-solid fa-spinner fa-spin"></i>
                                         
                                    ) : (
                                        cartInfo.numOfCartItems
                                    )}
                                </span>
                            </Link>
                        </li>
                    </ul>


                    <ul className='flex gap-5 items-center'>
                        {!token ? (<>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/auth/login'>Login</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return `relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] hover:before:w-full hover:font-bold before:transition-[width] before:duration-300 before:bg-primary  ${isActive ? "font-bold before:w-full" : "before:w-0"}` }} to='/auth/register'>Signin</NavLink>
                            </li>
                        </>
                        ) : (
                            <li>
                                <span onClick={Logout}>
                                    <i className='fa-solid fa-right-from-bracket cursor-pointer'></i>
                                </span>
                            </li>)}
                    </ul>
                </div>
            </nav>
        </>
    )
}


