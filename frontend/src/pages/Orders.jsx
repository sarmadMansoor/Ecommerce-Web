import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { currency, products } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-4">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-6">
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col gap-2"
          >
            <div className="flex items-start gap-6 text-sm">
              {/* Left Side: Image */}
              <img
                className="w-16 sm:w-20 object-cover"
                src={item.image[0]}
                alt={item.name}
              />

              {/* Product Info + Status/Actions */}
              <div className="flex flex-col w-full">
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>

                {/* Main Row: Info | Ready to Ship | Track */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 w-full gap-4">
                  {/* Left (nothing, space filler) */}
                  <div className="flex-1 hidden md:block"></div>

                  {/* Center: Ready to ship */}
                  <div className="flex justify-center items-center gap-2 flex-1">
                    <span className="min-w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-sm md:text-base text-gray-500">Ready to ship</p>
                  </div>

                  {/* Right: Track Order */}
                  <div className="flex justify-end flex-1">
                    <button className="border px-4 py-2 text-sm font-medium rounded-sm text-black">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-500 mt-2">
              Date: <span className="text-gray-400">Jul, 2024</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
