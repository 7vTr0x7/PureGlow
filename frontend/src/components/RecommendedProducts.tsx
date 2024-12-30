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

interface IProduct {
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

type PropType = {
acneLevel:number,darkSpots:number,hydrationLevel:number
}

const RecommendedProducts: React.FC<PropType> = ({acneLevel,darkSpots,hydrationLevel}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);


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
   


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts?.length > 0 && filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default RecommendedProducts;
