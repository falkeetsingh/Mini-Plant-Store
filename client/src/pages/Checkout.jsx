import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { placeOrder, clearOrderSuccess, fetchCart } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Checkout() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const cartItems = useSelector((state) => state.cart.items);
  const { loading, error, orderSuccess, lastOrder } = useSelector((state) => state.cart);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState('');

  // Fetch cart on component mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Handle successful order
  useEffect(() => {
    if (orderSuccess && lastOrder) {
      // Redirect to order success page or show success message
      alert(`Order placed successfully! Order ID: ${lastOrder._id}`);
      dispatch(clearOrderSuccess());
      navigate('/orders'); // or wherever you want to redirect
    }
  }, [orderSuccess, lastOrder, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      setLocalError('');

      // Validate form
      const requiredFields = [
        'fullName', 'email', 'phone', 'addressLine1', 
        'city', 'state', 'postalCode', 'country'
      ];

      for (let field of requiredFields) {
        if (!formData[field]?.trim()) {
          const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
          toast.error(`Please enter ${fieldName}`);
          return;
        }
      }

      if (!paymentMethod) {
        toast.error('Please select a payment method');
        return;
      }

      if (paymentMethod === 'card') {
        const cardRequired = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        for (let field of cardRequired) {
          if (!cardDetails[field]?.trim()) {
            toast.error(`Please enter ${field}`);
            return;
          }
        }
      }

      // Fetch updated cart
      const response = await dispatch(fetchCart()).unwrap();
      const updatedCartItems = response.items;

      if (!updatedCartItems || updatedCartItems.length === 0) {
        toast.error('Your cart is empty. Please add items before placing an order.');
        return;
      }

      const total = updatedCartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      const orderData = {
        items: updatedCartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        totalAmount: total,
        paymentMethod,
        address: { ...formData },
      };

      await dispatch(placeOrder(orderData)).unwrap();
      toast.success('Order placed successfully!');
      navigate('/orders');

    } catch (error) {
      console.error('Order placement error:', error);
      toast.error('Failed to place order. Please try again.');
      setLocalError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Secure Checkout
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your plant purchase with confidence. Your green friends are just one step away from their new home.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Empty Cart State */}
        {cartItems?.length === 0 && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Discover our collection of beautiful plants and bring nature home.</p>
              <button 
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Browse Plants
              </button>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        {cartItems?.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="xl:col-span-2 space-y-8">
              {/* Billing Details */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full text-lg font-bold mr-4 shadow-md">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apartment, Suite, etc. (Optional)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Apt 4B"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="New York"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State / Province *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="NY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="10001"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-8">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full text-lg font-bold mr-4 shadow-md">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Credit/Debit Card */}
                  <label className={`group border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'card' 
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-100' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v4H4v-4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Credit/Debit Card</div>
                          <div className="text-sm text-gray-500">Visa, MasterCard, American Express</div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label className={`group border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'paypal' 
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-100' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">PP</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">PayPal</div>
                          <div className="text-sm text-gray-500">Pay with your PayPal account</div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Apple Pay */}
                  <label className={`group border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'apple_pay' 
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-100' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="apple_pay"
                        checked={paymentMethod === 'apple_pay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Apple Pay</div>
                          <div className="text-sm text-gray-500">Touch ID or Face ID</div>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Google Pay */}
                  <label className={`group border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'google_pay' 
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-100' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="google_pay"
                        checked={paymentMethod === 'google_pay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-red-600 text-xs font-bold">G</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Google Pay</div>
                          <div className="text-sm text-gray-500">Fast and secure payment</div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Card Details - Show only when card is selected */}
                {paymentMethod === 'card' && (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center mb-6">
                      <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <h3 className="font-semibold text-gray-800">Secure Card Details</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={cardDetails.cardNumber}
                          onChange={handleCardChange}
                          maxLength="19"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={cardDetails.cardName}
                          onChange={handleCardChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardChange}
                          maxLength="5"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          maxLength="3"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {(localError || error) && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{localError || error}</span>
                </div>
              )}

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`w-full text-white text-lg font-semibold py-4 rounded-lg transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Processing Order...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Complete Order • ₹{total}
                  </div>
                )}
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-fit sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{item.product.name}</h3>
                      <div className="mt-1 flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-semibold text-gray-900">₹{item.product.price * item.quantity}</p>
                      <p className="text-sm text-gray-500">₹{item.product.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <div className="text-right">
                    <span className="font-medium text-green-600">Free</span>
                    <div className="text-xs text-gray-500">On orders over ₹1000</div>
                  </div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Plant Care Guide</span>
                  <span className="font-medium text-green-600">Included</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Selected Payment Method Display */}
              {paymentMethod && (
                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-green-800">Payment Method Selected</div>
                      <div className="text-sm text-green-700">
                        {paymentMethod === 'card' ? 'Credit/Debit Card' : 
                         paymentMethod === 'paypal' ? 'PayPal' :
                         paymentMethod === 'apple_pay' ? 'Apple Pay' : 
                         paymentMethod === 'google_pay' ? 'Google Pay' : paymentMethod}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure SSL encrypted checkout</span>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free shipping on orders over ₹1000
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  30-day plant guarantee
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Expert plant care support
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}