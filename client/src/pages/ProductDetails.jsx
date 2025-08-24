import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchProductById } from '../features/products/productSlice';
import { FaStar, FaHeart } from 'react-icons/fa';
import { addToCart } from '../features/cart/cartSlice';
import { fetchReviews, addReview } from '../features/review/reviewSlice';
import { addToWishlist, removeFromWishlist, fetchWishlist } from '../features/wishlist/wishlistSlice';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct: product, loading, error } = useSelector(state => state.products);

  const wishlist = useSelector((state) => state.wishlist?.items ?? []);
  const cleanWishlist = wishlist.filter(item => item && item._id);
  const isWishlisted = product && cleanWishlist.some(item => item._id === product._id);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const handleReviewImage = (e) => setReviewImage(e.target.files[0]);

  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector(state => state.review);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchReviews(id));
    dispatch(fetchWishlist());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success('Added to cart');
      })
      .catch(() => {
        toast.error('Failed to add to cart');
      });
  };

  const handleSubmitReview = async () => {
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    const reviewData = { productId: id, rating, text: reviewText, reviewImage };

    try {
      await dispatch(addReview(reviewData)).unwrap();
      setRating(0);
      setReviewText('');
      setReviewImage(null);
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id))
        .unwrap()
        .then(() => toast.info('Removed from wishlist'))
        .catch(() => toast.error('Failed to remove from wishlist'));
    } else {
      dispatch(addToWishlist(product._id))
        .unwrap()
        .then(() => toast.success('Added to wishlist'))
        .catch(() => toast.error('Failed to add to wishlist'));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-stone-600">Loading product details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center bg-white p-6 rounded-lg shadow-sm border border-stone-200">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center bg-white p-6 rounded-lg shadow-sm border border-stone-200">
        <p className="text-stone-600">Product not found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Product Section */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            
            {/* Image Section */}
            <div className="space-y-4">
              <div className="bg-stone-100 rounded-lg p-4">
                <img
                  src={selectedImage || product.mainImage}
                  alt={product.name}
                  onError={(e) => (e.target.src = '/fallback.jpg')}
                  className="w-full h-80 lg:h-96 object-cover rounded-lg"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              {(product.mainImage || product.gallery?.length > 0) && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.mainImage && (
                    <img
                      src={product.mainImage}
                      alt="Main"
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                        selectedImage === '' 
                          ? 'border-green-600' 
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                      onClick={() => setSelectedImage('')}
                    />
                  )}
                  {product.gallery?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 flex-shrink-0 ${
                        selectedImage === img 
                          ? 'border-green-600' 
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.price && (
                <div className="text-2xl font-bold text-stone-900">
                  ₹{product.price}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500 border border-red-200'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 focus:ring-stone-500 border border-stone-200'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <FaHeart className={isWishlisted ? 'text-red-500' : 'text-stone-400'} />
                    {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Submission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 mb-8">
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-900">
              Write a Review
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating 
                        ? 'text-yellow-400' 
                        : 'text-stone-300'
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-stone-600">
                    {rating} out of 5 stars
                  </span>
                )}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-stone-900"
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Add Photo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer">
                  <input 
                    type="file" 
                    onChange={handleReviewImage} 
                    accept="image/*" 
                    className="hidden"
                  />
                  <div className="inline-flex items-center px-4 py-2 bg-stone-100 border border-stone-300 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-200">
                    Choose File
                  </div>
                </label>
                
                {reviewImage && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(reviewImage)}
                      alt="Review Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-stone-200"
                    />
                    <button
                      onClick={() => setReviewImage(null)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitReview}
              disabled={reviewsLoading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {reviewsLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>

        {/* Reviews Display Section */}
        <div className="bg-white rounded-lg shadow-sm border border-stone-200">
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-xl font-semibold text-stone-900">
              Customer Reviews
            </h2>
          </div>

          <div className="p-6">
            {reviewsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent mx-auto mb-3"></div>
                <p className="text-stone-600">Loading reviews...</p>
              </div>
            ) : reviewsError ? (
              <div className="text-center py-8">
                <p className="text-red-600">{reviewsError}</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-stone-500">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b border-stone-200 last:border-b-0 pb-6 last:pb-0">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-medium">
                          {review.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-stone-900">
                            {review.user?.name || 'Anonymous User'}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? 'text-yellow-400' : 'text-stone-300'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-stone-500">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-stone-700 mb-3">
                      {review.text}
                    </p>

                    {/* Review Image */}
                    {review.image && (
                      <img
                        src={review.image}
                        alt="Review"
                        className="w-24 h-24 object-cover rounded-lg border border-stone-200"
                        onError={(e) => (e.target.src = '/fallback.jpg')}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}