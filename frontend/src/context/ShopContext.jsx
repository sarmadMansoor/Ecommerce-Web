import { createContext, useState } from "react";
import { products } from "../assets/assets"; // ✅ Correct named import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const Navigate= useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Size');
      return;
    }
    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success("Item Has been Added Successfully");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size] || 0;
        totalCount += qty;
      }
    }
    return totalCount;
  };

  const updatedQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      // remove size entry if quantity is zero
      delete cartData[itemId][size];
      // if no sizes remain, remove the product key
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      // match using _id field
      const itemInfo = products.find(
        (product) => String(product._id) === String(productId)
      );
      if (!itemInfo) continue;

      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size] || 0;
        totalAmount += itemInfo.price * qty;
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updatedQuantity,
    getCartAmount,Navigate
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
