import React from 'react';
import { Shield, BarChart3, Store, Users, Star, CheckSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import type { SystemAdminScreen } from '../SystemAdminDashboard';

interface SystemAdminSidebarProps {
  currentScreen: SystemAdminScreen;
  onScreenChange: (screen: SystemAdminScreen) => void;
  onLogout: () => void;
}

export function SystemAdminSidebar({ currentScreen, onScreenChange, onLogout }: SystemAdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard' as SystemAdminScreen, label: 'Dashboard', icon: BarChart3 },
    { id: 'stores' as SystemAdminScreen, label: 'Stores', icon: Store },
    { id: 'admins' as SystemAdminScreen, label: 'Shop Admins', icon: Users },
    { id: 'reviews' as SystemAdminScreen, label: 'Reviews', icon: Star },
    { id: 'approvals' as SystemAdminScreen, label: 'Store Approvals', icon: CheckSquare },
    { id: 'settings' as SystemAdminScreen, label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-purple-800">System Admin</h1>
            <p className="text-sm text-purple-600">Platform Control</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <li key={item.id}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 rounded-xl ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-purple-50'
                  }`}
                  onClick={() => onScreenChange(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-red-50 rounded-xl"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}