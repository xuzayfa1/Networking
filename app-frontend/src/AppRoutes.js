import React from 'react';
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from './components/register';

import PrivateRoute from "./PrivateRoutes";

import Dashboard from "./components/dashboard";
import ProductTable from "./components/productTables";
import UsersTable from './components/usersTable';
import Orders from './components/orders';
import AddProduct from './components/addProduct';
import EditProduct from './components/editProduct';
import DeleteProduct from './components/deleteProduct';
import UserEdit from './components/userEdit';
import UserDelete from './components/userDelete';
import BuyProducts from './components/buyComponent';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= Public routes ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================ Protected routes ================ */}
      {/* 
         Quyidagi Route “element={<PrivateRoute />}” orqali belgilangani sababli,
         uning ichida joylashgan child-Route’lar faqat authenticated foydalanuvchilarga ko‘rsatiladi.
         Aks holda “/login” sahifasiga yo‘naltiradi.
      */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/users/edit/:id" element={<UserEdit />} />
        <Route path="/users/delete/:id" element={<UserDelete />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/delete/:id" element={<DeleteProduct />} />

        <Route path="/buy-products" element={<BuyProducts />} />
      </Route>
      {/* ================================================ */}
    </Routes>
  );
}

export default AppRoutes;
