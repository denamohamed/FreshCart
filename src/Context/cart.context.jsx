import { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import axios from 'axios'
import { userContext } from "./user.context"
import toast from "react-hot-toast";
import { wishlistContext } from "./wishList.context";

export let cartContext = createContext(null);

export default function CartProvider({ children }) {
    let { token } = useContext(userContext)
    let [cartInfo, setCartInfo] = useState(null)
    const { removeFromWishList } = useContext(wishlistContext)
    

    async function addProductToCart({ id }) {
        try {
            let options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token: token
                },
                data: {
                    productId: id
                }
            }
            let { data } = await axios.request(options)
            toast.success(data.message);
            getUserCart()
        } catch (error) {
            toast.error("Error adding item to cart");
            console.log(error)
        }
    }

    async function getUserCart() {
        let { data } = await axios.request({
            url: "https://ecommerce.routemisr.com/api/v1/cart",
            method: "GET",
            headers: {
                token
            }
        })
        setCartInfo(data)
    }

    useEffect(() => {
        getUserCart()
    }, [])

    async function updateCount({ id, count }) {
        let { data } = await axios.request({
            url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            method: "PUT",
            headers: {
                token
            },
            data: {
                count: count
            }
        })
        setCartInfo(data)
    }

    async function removeCartItem({ id }) {
        let { data } = await axios.request({
            url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            method: "DELETE",
            headers: {
                token
            }
        })
        if (data.numOfCartItems === 0) {
            setCartInfo([])
            getUserCart()
        } else {
            setCartInfo(data)
        }
    }

    async function clearCart() {
        let { data } = await axios.request({
            url: "https://ecommerce.routemisr.com/api/v1/cart",
            method: "DELETE",
            headers: {
                token
            }
        })
        if (data.message == "success") {
            setCartInfo([])
            getUserCart()
        }
        }


    return (
        <cartContext.Provider value={{ addProductToCart ,   cartInfo , setCartInfo , removeCartItem , updateCount , getUserCart ,clearCart}}>
            {children}
        </cartContext.Provider>
    )


}

