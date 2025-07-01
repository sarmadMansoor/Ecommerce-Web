import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Navigate } from 'react-router-dom';
const Cart = () => {
  const { products, currency, cartItems, updatedQuantity,Navigate } = useContext(ShopContext);

  // Directly compute cartData from cartItems
  const cartData = [];

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const qty = cartItems[productId][size];
      if (qty > 0) {
        cartData.push({
          id: productId,
          size,
          quantity: qty,
        });
      }
    }
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cartData.map((item, idx) => {
          const product = products.find(p => String(p._id) === String(item.id));
          if (!product) return null;

          return (
            <div
              key={idx}
              className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row gap-4"
            >
              {/* Left: Image + Info */}
              <div className="flex-1 flex items-start gap-4">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
                <div className="flex flex-col">
                  <p className="text-xs sm:text-lg font-medium">{product.name}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                    <span>{currency}{product.price}</span>
                    <span>Size: {item.size}</span>
                  </div>
                </div>
              </div>

              {/* Right: Qty input + delete */}
              <div className="flex-1 flex items-center">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    updatedQuantity(item.id, item.size, Math.max(1, Number(e.target.value)))
                  }
                  className="border w-16 px-2 py-1 rounded text-sm text-center mx-auto sm:mx-0"
                />
                <img
                  onClick={() => updatedQuantity(item.id, item.size, 0)}
                  src={assets.bin_icon}
                  alt="Remove"
                  title="Remove"
                  className="w-5 sm:w-6 ml-auto cursor-pointer"
                />
              </div>
            </div>
          );
        })
      )}

      {/* Cart Total Section */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div onClick={()=>Navigate('/place-order')} className='w-full text-end'>
  <button className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
