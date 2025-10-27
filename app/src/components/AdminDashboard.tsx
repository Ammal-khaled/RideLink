import React, { useState } from 'react';
import { AdminLogin } from './admin/AdminLogin';
import { AdminSidebar } from './admin/AdminSidebar';
import { DashboardStats } from './admin/DashboardStats';
import { CarsManagement } from './admin/CarsManagement';
import { BookingsManagement } from './admin/BookingsManagement';
import { AdminSettings } from './admin/AdminSettings';

export type AdminScreen = 'login' | 'dashboard' | 'cars' | 'bookings' | 'settings';

export function AdminDashboard() {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Mock authentication - in real app this would validate against backend
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true);
      setCurrentScreen('dashboard');
    } else {
      alert('Invalid credentials. Use username: admin, password: admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 overflow-auto">
        {currentScreen === 'dashboard' && <DashboardStats />}
        {currentScreen === 'cars' && <CarsManagement />}
        {currentScreen === 'bookings' && <BookingsManagement />}
        {currentScreen === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
}