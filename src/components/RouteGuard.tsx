import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import authStore from '../store/authStore';

interface RouteGuardProps {
  requiredRole?: 'user' | 'admin';
}

const RouteGuard: React.FC<RouteGuardProps> = ({ requiredRole = 'user' }) => {
  const { isAuthenticated, isAdmin, checkAuth, loading } = authStore();
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsChecking(false);
    };

    verifyAuth();
  }, [checkAuth]);

  if (isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Not authenticated at all
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Requires admin but user is not admin
  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the required role
  return <Outlet />;
};

export default RouteGuard;