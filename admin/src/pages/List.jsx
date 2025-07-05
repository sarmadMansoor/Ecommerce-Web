import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch the product list
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("Product List Response:", response.data);

      const data = response.data.products || response.data || [];
      setList(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch list: " + error.message);
    }
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${productId}`, {
        headers: { token: token }
      });

      if (response.data.success) {
        toast.success("🗑️ Product deleted");
        fetchList(); // Refresh list
      } else {
        toast.error("❌ Delete failed");
      }
    } catch (error) {
      toast.error("❌ Failed to delete product: " + error.message);
    }
  };

  // On mount, fetch product list
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2 text-lg font-semibold'>All Products List</p>
      <div className='flex flex-col gap-2'>

        {/* ---------- List Table Header ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 bg-gray-100 rounded font-semibold'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* ---------- Product List Items ---------- */}
        {list.map((item, idx) => (
          <div
            key={item._id || idx}
            className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border rounded hover:bg-gray-50 transition-all'
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className='w-12 h-12 object-cover rounded'
            />

            {/* Name */}
            <p className='truncate'>{item.name}</p>

            {/* Category */}
            <p>{item.category}</p>

            {/* Price */}
            <p>${item.price}</p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item._id)}
              className='text-red-500 hover:text-red-700 text-xl flex justify-center'
              title="Delete"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
