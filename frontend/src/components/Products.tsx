import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface SkinHealthMetrics {
  acneSuitability: number;
  hydrationSuitability: number;
  darkSpotsSuitability: number;
  skinSuitability: {
    minSkinScore: number;
    maxSkinScore: number;
  };
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  ratings: {
    average: number;
  };
  skinHealthMetrics: SkinHealthMetrics;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [acneLevel, setAcneLevel] = useState<number>(1);
  const [darkSpots, setDarkSpots] = useState<number>(1);
  const [hydrationLevel, setHydrationLevel] = useState<number>(1);

const fetchProducts = async () =>{
  const API_URL = import.meta.env.VITE_API_URL;

     try {
      const response = await fetch(`${API_URL}/api/user/products`, {
        method: 'GET',
        
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Invalid credentials. Please try again.');
      }

      const data = await response.json();

      if (data.success) {
setProducts(data.products)
console.log(data.products)
        setFilteredProducts(data.products)

      } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.log(error.message || 'An error occurred. Please try again later.');
    }
}

  useEffect(() => {
   fetchProducts()
  }, []);

  const handleFilterChange = () => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.skinHealthMetrics.acneSuitability >= acneLevel &&
          product.skinHealthMetrics.darkSpotsSuitability >= darkSpots &&
          product.skinHealthMetrics.hydrationSuitability >= hydrationLevel
      )
    );
  };

  useEffect(() => {
    handleFilterChange();
  }, [acneLevel, darkSpots, hydrationLevel]);

  return (
    <div className=" py-5 px-20 bg-[#f4f3f4]">

               <h1 className='mb-3 text-xl font-semibold'>/Filters</h1>

    <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
  <div className="flex flex-col">
    <label htmlFor="acneLevel" className="mb-2 text-sm font-medium text-gray-700">
      Acne Level (1-5)
    </label>
    <input
      id="acneLevel"
      type="number"
      min="1"
      max="5"
      value={acneLevel}
      onChange={(e) => setAcneLevel(Number(e.target.value))}
      className="p-3 border border-gray-300 rounded-md w-full md:w-32"
      placeholder="Enter acne level"
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="darkSpots" className="mb-2 text-sm font-medium text-gray-700">
      Dark Spots (1-5)
    </label>
    <input
      id="darkSpots"
      type="number"
      min="1"
      max="5"
      value={darkSpots}
      onChange={(e) => setDarkSpots(Number(e.target.value))}
      className="p-3 border border-gray-300 rounded-md w-full md:w-32"
      placeholder="Enter dark spots level"
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="hydrationLevel" className="mb-2 text-sm font-medium text-gray-700">
      Hydration Level (1-100)
    </label>
    <input
      id="hydrationLevel"
      type="number"
      min="1"
      max="100"
      value={hydrationLevel}
      onChange={(e) => setHydrationLevel(Number(e.target.value))}
      className="p-3 border border-gray-300 rounded-md w-full md:w-32"
      placeholder="Enter hydration level"
    />
  </div>
</div>
        <h1 className='mb-3 text-xl font-semibold'>/Products</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts?.length > 0 && filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Products;
