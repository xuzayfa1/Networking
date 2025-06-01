import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from "./components/userContext";

const PrivateRoute = () => {
  const { user, loading } = useUser();

  if (loading) return <div className="text-center p-5">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 ml-64 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateRoute;
