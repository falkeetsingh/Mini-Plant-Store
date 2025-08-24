import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '../features/cart/cartSlice';
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaShoppingBag, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, loading, error, orderSuccess } = useSelector(state => state.cart);
  const [localQuantities, setLocalQuantities] = useState({});
  const [showRemoveMsg, setShowRemoveMsg] = useState(false);
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    const quantities = {};
    cartItems.forEach(item => {
      quantities[item.product._id] = item.quantity;
    });
    setLocalQuantities(quantities);
  }, [cartItems]);

  useEffect(() => {
    if (showRemoveMsg) {
      const timer = setTimeout(() => setShowRemoveMsg(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showRemoveMsg]);

  const removeItem = (id) => {
    dispatch(removeFromCart({ productId: id }));
    setShowRemoveMsg(true);
  };

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedUpdate = debounce(async (id, qty) => {
    await dispatch(updateCartItem({ productId: id, quantity: qty }));
    setUpdating(prev => ({ ...prev, [id]: false }));
  }, 300);

  const handleQtyChange = (id, change) => {
    const newQty = localQuantities[id] + change;
    if (newQty < 1) return;

    setLocalQuantities(prev => ({ ...prev, [id]: newQty }));
    setUpdating(prev => ({ ...prev, [id]: true }));
    debouncedUpdate(id, newQty);
  };

  const total = Object.entries(localQuantities).reduce((acc, [id, qty]) => {
    const item = cartItems.find(i => i.product._id === id);
    if (!item || !item.product.price) return acc;
    return acc + item.product.price * qty;
  }, 0);

  if (loading) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-green-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-stone-600">Loading your cart...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center bg-white p-6 rounded-lg shadow-sm border border-stone-200">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FaShoppingBag className="text-white text-xl" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-stone-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Success/Remove Messages */}
        <div className="space-y-4 mb-6">
          {orderSuccess && (
            <div className="bg-green-100 border border-green-200 text-green-700 p-4 rounded-lg text-center font-medium">
              Order placed successfully!
            </div>
          )}
          {showRemoveMsg && (
            <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg text-center font-medium">
              Item removed from cart
            </div>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-12 max-w-lg mx-auto">
              <div className="text-6xl mb-6 text-stone-300">🛒</div>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-stone-600 mb-8">
                Start shopping to add items to your cart.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-4">
              {cartItems.map(item => {
                const id = item.product._id;
                const quantity = localQuantities[id] || 1;
                const itemTotal = item.product.price * quantity;

                return (
                  <div 
                    key={id} 
                    className="bg-white rounded-lg shadow-sm border border-stone-200 p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-stone-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.product.image ? (
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => e.target.src = '/fallback.jpg'}
                            />
                          ) : (
                            <span className="text-stone-400 text-2xl">📦</span>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <p className="text-xl font-bold text-stone-900">
                              ${item.product.price}
                            </p>
                            <p className="text-sm text-stone-500">
                              Total: ${itemTotal.toLocaleString()}
                            </p>
                          </div>

                          {/* Quantity Controls & Remove */}
                          <div className="flex items-center gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-stone-100 rounded-lg">
                              <button
                                onClick={() => handleQtyChange(id, -1)}
                                disabled={quantity === 1 || updating[id]}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                  quantity === 1 || updating[id]
                                    ? 'text-stone-300 cursor-not-allowed'
                                    : 'text-stone-600 hover:bg-stone-200'
                                }`}
                              >
                                <FaMinus className="text-xs" />
                              </button>
                              
                              <div className="w-12 text-center font-medium text-stone-900">
                                {updating[id] ? (
                                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                ) : (
                                  quantity
                                )}
                              </div>
                              
                              <button
                                onClick={() => handleQtyChange(id, 1)}
                                disabled={updating[id]}
                                className="w-8 h-8 rounded-lg text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-colors disabled:opacity-50"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(id)}
                              className="w-8 h-8 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-lg flex items-center justify-center transition-colors"
                              title="Remove item"
                            >
                              <FaTrashAlt className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-stone-200 sticky top-8">
                <div className="p-6">
                  {/* Summary Header */}
                  <h3 className="text-xl font-semibold text-stone-900 mb-6">
                    Order Summary
                  </h3>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-stone-200">
                      <span className="text-stone-600">Items ({cartItems.length})</span>
                      <span className="font-medium text-stone-900">
                        ${isNaN(total) ? 0 : total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-stone-200">
                      <span className="text-stone-600">Shipping</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-stone-200">
                      <span className="text-lg font-semibold text-stone-900">Total</span>
                      <span className="text-xl font-bold text-stone-900">
                        ${isNaN(total) ? 0 : total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mb-4"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping Link */}
                  <button
                    onClick={() => navigate('/')}
                    className="w-full text-green-600 hover:text-green-700 font-medium py-2 transition-colors"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;