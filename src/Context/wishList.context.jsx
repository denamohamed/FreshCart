

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { userContext } from './user.context';
import toast from 'react-hot-toast';

export const wishlistContext = createContext(null);

export default function WishListProvider({ children }) {
  const { token } = useContext(userContext);
  const [wishListInfo, setWishListInfo] = useState([]);

  async function getUserWishList() {
    try {
      const options = {
        method: 'GET',
        url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
        headers: {
          token,
        },
      };
      const { data } = await axios.request(options);
      setWishListInfo(data.data)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getUserWishList()
  }, [])


  async function addToWishList({ id }) {
    try {
      const options = {
        method: 'POST',
        url: 'https://ecommerce.routemisr.com/api/v1/wishlist',
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      const { data } = await axios.request(options);
      getUserWishList()
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error('Error adding item to wishlist');
    }
  };


  async function removeFromWishList(id) {
    try {
      const options = {
        method: 'DELETE',
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        headers: {
          token,
        },
      };
      
      const { data } = await axios.request(options);
      
      if (data.count === 0) {
        setWishListInfo([]);  
      } else {
        const updatedWishList = wishListInfo.filter(item => item._id !== id);
        setWishListInfo(updatedWishList);
      }
  
      toast.success('Product Removed From Wishlist Successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error removing item from wishlist');
    }
  }
  



  function isProductInWishlist(productId) {
    return wishListInfo?.some(item => item._id === productId);
  };

  return (
    <wishlistContext.Provider value={{ addToWishList, getUserWishList, removeFromWishList, wishListInfo, isProductInWishlist }}>
      {children}
    </wishlistContext.Provider>
  );
}

