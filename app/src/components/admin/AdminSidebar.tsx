import React from 'react';
import { Car, BarChart3, Calendar, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import type { AdminScreen } from '../AdminDashboard';

interface AdminSidebarProps {
  currentScreen: AdminScreen;
  onScreenChange: (screen: AdminScreen) => void;
  onLogout: () => void;
}

export function AdminSidebar({ currentScreen, onScreenChange, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard' as AdminScreen, label: 'Dashboard', icon: BarChart3 },
    { id: 'cars' as AdminScreen, label: 'Cars', icon: Car },
    { id: 'bookings' as AdminScreen, label: 'Bookings', icon: Calendar },
    { id: 'settings' as AdminScreen, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-primary">RideLink</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
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
                    isActive ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground'
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
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}