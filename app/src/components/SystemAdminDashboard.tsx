import React, { useState } from 'react';
import { SystemAdminLogin } from './system-admin/SystemAdminLogin';
import { SystemAdminSidebar } from './system-admin/SystemAdminSidebar';
import { SystemDashboardStats } from './system-admin/SystemDashboardStats';
import { StoresManagement } from './system-admin/StoresManagement';
import { AdminsManagement } from './system-admin/AdminsManagement';
import { ReviewsManagement } from './system-admin/ReviewsManagement';
import { SystemSettings } from './system-admin/SystemSettings';
import { StoreApprovals } from './system-admin/StoreApprovals';

export type SystemAdminScreen = 'login' | 'dashboard' | 'stores' | 'admins' | 'reviews' | 'approvals' | 'settings';

export function SystemAdminDashboard() {
  const [currentScreen, setCurrentScreen] = useState<SystemAdminScreen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Mock authentication - in real app this would validate against backend
    if (credentials.username === 'system' && credentials.password === 'system123') {
      setIsAuthenticated(true);
      setCurrentScreen('dashboard');
    } else {
      alert('Invalid credentials. Use username: system, password: system123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  if (!isAuthenticated) {
    return <SystemAdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SystemAdminSidebar 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 overflow-auto">
        {currentScreen === 'dashboard' && <SystemDashboardStats />}
        {currentScreen === 'stores' && <StoresManagement />}
        {currentScreen === 'admins' && <AdminsManagement />}
        {currentScreen === 'reviews' && <ReviewsManagement />}
        {currentScreen === 'approvals' && <StoreApprovals />}
        {currentScreen === 'settings' && <SystemSettings />}
      </div>
    </div>
  );
}