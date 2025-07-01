import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
  let filtered = [...products];

  // Search filter
  if (search.trim() !== '') {
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Category filter
  if (category.length > 0) {
    filtered = filtered.filter((item) => category.includes(item.category));
  }

  // Subcategory filter
  if (subCategory.length > 0) {
    filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
  }

  // Sort logic
  if (sortOption === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  setFilteredProducts(filtered);
}, [products, category, subCategory, sortOption, search]); // ✅ Include `search` in dependencies


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Section */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${
              showFilter ? 'rotate-90' : ''
            }`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {/* ✅ As requested, unchanged HTML below */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} /> Men
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} /> Women
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {/* ✅ Keeping simple HTML here too */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Winterware'} onChange={toggleSubCategory} /> Winterware
            </p>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1='ALL' text2='COLLECTIONS' />
          <select
            className='border-2 border-gray-300 text-sm px-2 py-1 rounded-md'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
