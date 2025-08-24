import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { Link } from 'react-router-dom';
import { 
  BiImageAlt, 
  BiPlus, 
  BiEdit, 
  BiTrash, 
  BiPackage, 
  BiSearch,
  BiFilter,
  BiGrid,
  BiListUl,
  BiDollar,
  BiCategory,
  BiCube
} from 'react-icons/bi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState({});
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axiosInstance.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = product.name?.toLowerCase().includes(searchLower);
      const categoryMatch = product.category && typeof product.category === 'string' 
        ? product.category.toLowerCase().includes(searchLower)
        : false;
      
      return nameMatch || categoryMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'stock':
          return (a.stock ?? 0) - (b.stock ?? 0);
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-stone-600">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => {
        const imageUrl = product.mainImage;
        
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              {brokenImages[product._id] || !imageUrl ? (
                <div className="w-full h-full flex items-center justify-center bg-stone-100">
                  <BiImageAlt className="text-stone-400 text-4xl" />
                </div>
              ) : (
                <img
                  src={imageUrl}
                  alt={product.name}
                  onError={() => handleImageError(product._id)}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Stock Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                (product.stock ?? 0) > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {(product.stock ?? 0) > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-stone-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-stone-900">${product.price}</span>
                <span className="text-sm text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                  {product.category || 'N/A'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to={`/admin/dashboard/products/edit/${product._id}`}
                  className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <BiEdit className="mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <BiTrash />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderTableView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-stone-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-stone-700">
                <div className="flex items-center">
                  <BiImageAlt className="mr-2" />
                  Image
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-stone-700">
                <div className="flex items-center">
                  <BiPackage className="mr-2" />
                  Name
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-stone-700">
                <div className="flex items-center">
                  <BiDollar className="mr-2" />
                  Price
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-stone-700">
                <div className="flex items-center">
                  <BiCategory className="mr-2" />
                  Category
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-stone-700">
                <div className="flex items-center">
                  <BiCube className="mr-2" />
                  Stock
                </div>
              </th>
              <th className="text-left py-4 px-6 font-semibold text-stone-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const imageUrl = product.mainImage;

              return (
                <tr key={product._id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors duration-200">
                  <td className="py-4 px-6">
                    {brokenImages[product._id] || !imageUrl ? (
                      <div className="w-16 h-16 flex items-center justify-center bg-stone-100 border border-stone-200 rounded-lg">
                        <BiImageAlt className="text-stone-400 w-8 h-8" />
                      </div>
                    ) : (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        onError={() => handleImageError(product._id)}
                        className="w-16 h-16 object-cover rounded-lg border border-stone-200"
                      />
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-stone-900">{product.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-semibold text-stone-900">${product.price}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-stone-100 text-stone-800">
                      {product.category || 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      (product.stock ?? 0) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        (product.stock ?? 0) > 0 ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                      {product.stock ?? 0}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/admin/dashboard/products/edit/${product._id}`}
                        className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <BiEdit className="mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="inline-flex items-center px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                      >
                        <BiTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-stone-900 flex items-center">
                <BiPackage className="mr-3 text-green-600" />
                Products Management
              </h2>
              <p className="text-stone-600 mt-1">
                Manage your product inventory and listings
              </p>
            </div>
            
            <Link
              to="/admin/dashboard/products/add"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <BiPlus className="mr-2 text-lg" />
              Add New Product
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-4 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <BiFilter className="text-stone-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price">Sort by Price</option>
                  <option value="stock">Sort by Stock</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-stone-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  <BiListUl className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  <BiGrid className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600">Total Products</p>
                <p className="text-2xl font-bold text-stone-900">{products.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <BiPackage className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter(p => (p.stock ?? 0) > 0).length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <BiCube className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter(p => (p.stock ?? 0) === 0).length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <BiTrash className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-12 text-center">
            <BiPackage className="mx-auto text-6xl text-stone-300 mb-4" />
            <h3 className="text-xl font-semibold text-stone-900 mb-2">
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-stone-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or filters'
                : 'Get started by adding your first product to the inventory'
              }
            </p>
            {!searchTerm && (
              <Link
                to="/admin/dashboard/products/add"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <BiPlus className="mr-2" />
                Add Your First Product
              </Link>
            )}
          </div>
        ) : (
          <>
            {viewMode === 'table' ? renderTableView() : renderGridView()}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;