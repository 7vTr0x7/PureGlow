interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isInStock = product.stock > 0;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img
        src="https://via.placeholder.com/200"
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {product.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-800 font-medium text-sm">Price: ${product.price}</p>
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              isInStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-3 flex items-center space-x-2">
          <span className="text-yellow-500">⭐ {product.ratings.average}</span>
          <span className="text-gray-600 text-sm">({product.ratings.count} reviews)</span>
        </div>

        <div className="mt-4 flex justify-center items-center">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isInStock ? "bg-gradient-to-r bg-[#cc8a68] to-purple-600 text-white hover:from-purple-600 hover:to-blue-500" : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            disabled={!isInStock}
          >
            {isInStock ? "View Details" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
