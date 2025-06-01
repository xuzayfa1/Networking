import axios from 'axios';

const API_BASE = 'http://13.233.238.172:8085/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Automatically attach JWT token (if exists) to every request
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('AccessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// ==================== Auth APIs ====================

// Login user (returns { AccessToken, refreshToken })
export const login = (credentials) => api.post('/auth/login', credentials);

// Register new user (if your backend supports it)
export const register = (data) => api.post('/auth/register', data);

// Get current authenticated user
export const getCurrentUser = () => api.get('/auth/me');

// ==================== User APIs ====================

// Fetch all users
export const getAllUsers = () => api.get('/users/list');

// Fetch single user by ID
export const getUserById = (id) => api.get(`/users/${id}`);

// Update user by ID
export const updateUserById = (id, data) => api.post(`/users/${id}`, data);

// Delete user by ID
export const deleteUserById = (id) => api.delete(`/users/${id}`);

// ==================== Product APIs ====================

// Fetch all products
export const getAllProducts = () => api.get('/products');

// Fetch single product by ID
export const getProductById = (id) => api.get(`/product/${id}`);

// Create a new product
export const createProduct = (data) => api.post('/add-product', data);

// Update existing product by ID
export const updateProductById = (id, data) => api.post(`/edit-product/${id}`, data);

// Delete product by ID
export const deleteProductById = (id) => api.delete(`/products/${id}`);

// ==================== Order APIs ====================

// Fetch all orders
export const getAllOrders = () => api.get('/orders');

// Fetch single order by ID (if needed)
export const getOrderById = (id) => api.get(`/orders/${id}`);

// Create an order (BuyProducts component uses this)
export const createOrder = (orderData) => api.post('/create/order', orderData);

// Delete order by ID
export const deleteOrderById = (id) => api.delete(`/orders/${id}`);

// ==================== Dashboard APIs ====================

// Fetch dashboard statistics
export const getDashboardStats = () => api.get('/dashboard/stats');

// Fetch data for sales bar chart
export const getSalesBarData = () => api.get('/sales/bar');

// Fetch data for revenue line chart
export const getSalesLineData = () => api.get('/sales/line');

// Fetch data for sales pie chart
export const getSalesPieData = () => api.get('/sales/pie');

// ==================== Customer APIs ====================

// Fetch all customers
export const getAllCustomers = () => api.get('/customers');

// ==================== Activity APIs ====================

// Fetch all activities
export const getAllActivities = () => api.get('/activities');

export default api;
