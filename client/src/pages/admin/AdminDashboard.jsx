import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import Products from './Products';
import Orders from './Orders';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/dashboard');
        setStats(res.data);
      } catch {
        setStats(null);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const navigationItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      isExact: true
    },
    {
      path: '/admin/dashboard/products',
      name: 'Products',
      isExact: false
    },
    {
      path: '/admin/dashboard/orders',
      name: 'Orders',
      isExact: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out border-r border-gray-200`}>
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600 mt-1">Management Dashboard</p>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = item.isExact 
                ? location.pathname === item.path || (location.pathname === '/admin/dashboard' && item.path === '/admin/dashboard')
                : location.pathname.includes(item.path.split('/').pop());
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="font-medium text-gray-900">Administrator</p>
              <p className="text-xs text-gray-500 mt-1">System Admin</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Admin Dashboard
                    </h1>
                    <p className="text-gray-600 text-sm">
                      Manage your e-commerce platform
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="hidden md:flex items-center gap-4">
                  {stats && (
                    <>
                      <div className="bg-blue-50 px-3 py-2 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 text-sm">Users:</span>
                          <span className="text-blue-700 font-medium">{stats.totalUsers}</span>
                        </div>
                      </div>
                      <div className="bg-green-50 px-3 py-2 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 text-sm">Products:</span>
                          <span className="text-green-700 font-medium">{stats.totalProducts}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview stats={stats} loading={loading} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/products/edit/:id" element={<EditProduct />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ stats, loading }) => {
  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-sm border">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-gray-700">Loading dashboard...</span>
      </div>
    </div>
  );
  
  if (!stats) return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 max-w-md text-center">
        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Unavailable</h3>
        <p className="text-red-600">Failed to load dashboard data</p>
      </div>
    </div>
  );

  const statsCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      color: 'blue'
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      color: 'green'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      color: 'purple'
    },
    {
      title: 'Total Sales',
      value: `₹${stats.totalSales?.toLocaleString()}`,
      color: 'orange'
    }
  ];

  const getCardClasses = (color) => {
    const classes = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      orange: 'bg-orange-50 border-orange-200 text-orange-900'
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">
          Monitor your business performance at a glance
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card) => (
          <div 
            key={card.title}
            className={`${getCardClasses(card.color)} p-6 rounded-lg border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-75 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-semibold">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          <p className="text-gray-600 text-sm">Latest customer transactions</p>
        </div>
        
        <div className="p-6">
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Recent Orders</h4>
              <p className="text-gray-500">Orders will appear here when customers make purchases</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order, index) => (
                    <tr 
                      key={order._id} 
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm text-gray-600">
                          #{order._id.slice(-8)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">
                          {order.user?.name || 'Guest User'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-green-600">
                          ₹{order.total?.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600">
                          <div>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;