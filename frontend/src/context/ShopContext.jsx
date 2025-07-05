import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App"; // Make sure this path is correct

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const [products, setProducts] = useState([]); // 👈 dynamic products
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const Navigate = useNavigate();
  const [token,setToken]=useState('');

  // 🔁 Fetch product list from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      const data = response.data.products || response.data || [];

      if (!Array.isArray(data)) throw new Error("Invalid product format");

      setProducts(data);
    } catch (error) {
      toast.error("⚠️ Failed to load products");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    toast.success("Item has been added successfully");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size] || 0;
      }
    }
    return totalCount;
  };

  const updatedQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const productId in cartItems) {
      const itemInfo = products.find(
        (product) => String(product._id) === String(productId)
      );
      if (!itemInfo) continue;

      for (const size in cartItems[productId]) {
        totalAmount += itemInfo.price * (cartItems[productId][size] || 0);
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
    getCartAmount,
    Navigate,token,setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
