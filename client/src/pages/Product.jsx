import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedPlantCare, setSelectedPlantCare] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoriesFromURL = queryParams.getAll('category');
    if (categoriesFromURL.length > 0) {
      setSelectedCategories(categoriesFromURL);
    } else {
      setSelectedCategories([]);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams(location.search);
        const categoryFilters = queryParams.getAll('category');

        const res = await axiosInstance.get('/api/products', {
          params: { category: categoryFilters },
        });

        setProducts(res.data);
        setSelectedCategories(categoryFilters);
      } catch (err) {
        setError('Failed to load plants. Please try again.');
      }
      setLoading(false);
    };

    fetchFilteredProducts();
  }, [location.search]);

  const categories = [
    ...new Set(
      products
        .flatMap((p) => Array.isArray(p.category) ? p.category : [p.category])
        .filter(Boolean)
    )
  ];


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    let updatedCategories = [...selectedCategories];
    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== value);
    }

    setSelectedCategories(updatedCategories);

    const params = new URLSearchParams(location.search);
    params.delete('category');
    updatedCategories.forEach((cat) => params.append('category', cat));
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const handlePlantCareChange = (e) => {
    setSelectedPlantCare(e.target.value);
  };

  const filterProducts = () => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(search.toLowerCase()));

      const price = product.price;
      let matchesPrice = true;
      switch (selectedPriceRange) {
        case 'under100':
          matchesPrice = price < 100;
          break;
        case '100to200':
          matchesPrice = price >= 100 && price <= 200;
          break;
        case '200to300':
          matchesPrice = price > 200 && price <= 300;
          break;
        case 'above300':
          matchesPrice = price > 300;
          break;
        default:
          matchesPrice = true;
      }

      let matchesCare = true;
      if (selectedPlantCare && product.careLevel) {
        matchesCare = product.careLevel === selectedPlantCare;
      }

      return matchesSearch && matchesPrice && matchesCare;
    });
  };

  const filteredProducts = filterProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Plant Collection
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover our curated selection of healthy plants for your home and office
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Filters
            <svg className={`w-4 h-4 transition-transform ${isMobileFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Panel */}
          <aside className={`
            lg:w-80 w-full bg-white rounded-lg border border-gray-200 p-6 space-y-6 h-fit
            ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}
          `}>
            {/* Search Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plants..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Categories</label>
              <div className="space-y-2">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        value={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={handleCategoryChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">{cat}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No categories available</p>
                )}
              </div>
            </div>

            {/* Care Level Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Care Level</label>
              <div className="space-y-2">
                {[
                  { label: 'All levels', value: '' },
                  { label: 'Easy care', value: 'Easy' },
                  { label: 'Medium care', value: 'Medium' },
                  { label: 'Expert care', value: 'Hard' },
                ].map(({ label, value }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="radio"
                      name="plantCare"
                      value={value}
                      checked={selectedPlantCare === value}
                      onChange={handlePlantCareChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900">Price Range</label>
              <div className="space-y-2">
                {[
                  { label: 'All prices', value: '' },
                  { label: 'Under ₹100', value: 'under100' },
                  { label: '₹100 - ₹200', value: '100to200' },
                  { label: '₹200 - ₹3,00', value: '200to300' },
                  { label: 'Above ₹3,00', value: 'above300' },
                ].map(({ label, value }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      value={value}
                      checked={selectedPriceRange === value}
                      onChange={handlePriceChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Section */}
          <section className="flex-1">
            {/* Results Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'plant' : 'plants'} found
                </p>
              </div>
              
              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedPriceRange || selectedPlantCare || search) && (
                <div className="flex flex-wrap gap-2">
                  {search && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium">
                      "{search}"
                      <button 
                        onClick={() => setSearch('')}
                        className="ml-1 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategories.map(cat => (
                    <span key={cat} className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs font-medium">
                      {cat}
                      <button 
                        onClick={() => {
                          const updatedCategories = selectedCategories.filter(c => c !== cat);
                          setSelectedCategories(updatedCategories);
                          const params = new URLSearchParams(location.search);
                          params.delete('category');
                          updatedCategories.forEach((c) => params.append('category', c));
                          navigate(`${location.pathname}?${params.toString()}`, { replace: true });
                        }}
                        className="ml-1 hover:text-green-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {selectedPlantCare && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-medium">
                      {selectedPlantCare} care
                      <button 
                        onClick={() => setSelectedPlantCare('')}
                        className="ml-1 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedPriceRange && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-medium">
                      Price filter
                      <button 
                        onClick={() => setSelectedPriceRange('')}
                        className="ml-1 hover:text-purple-600"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600">Loading plants...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
                  <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No plants found</h3>
                  <p className="text-gray-600 text-sm">Try adjusting your filters or search terms</p>
                </div>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/products/${product._id}`}
                    key={product._id}
                    className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-48 bg-gray-50">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="object-contain w-full h-full p-4"
                      />
                      {product.careLevel && (
                        <div className="absolute top-3 right-3 bg-white shadow-sm border border-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                          {product.careLevel}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                            {product.name}
                          </h3>
                          {product.category && (
                            <p className="text-sm text-gray-600 mt-1">
                              {Array.isArray(product.category)
                                ? product.category.join(", ")
                                : product.category}
                            </p>
                          )}

                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-semibold text-gray-900">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm text-gray-500">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Product;