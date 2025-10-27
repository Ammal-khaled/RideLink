import React, { useState } from 'react';
import { CustomerApp } from './components/CustomerApp';
import { AdminDashboard } from './components/AdminDashboard';
import { SystemAdminDashboard } from './components/SystemAdminDashboard';
import { Button } from './components/ui/button';
import { Smartphone, Monitor, Shield } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'customer' | 'admin' | 'system'>('customer');

  return (
    <div className="min-h-screen bg-background">
      {/* View Toggle Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-title text-primary">RideLink</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
            <Button
              variant={view === 'customer' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('customer')}
              className={`gap-2 ${view === 'customer' ? 'bg-primary text-white' : ''}`}
            >
              <Smartphone className="w-4 h-4" />
              Customer App
            </Button>
            <Button
              variant={view === 'admin' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('admin')}
              className={`gap-2 ${view === 'admin' ? 'bg-primary text-white' : ''}`}
            >
              <Monitor className="w-4 h-4" />
              Shop Admin
            </Button>
            <Button
              variant={view === 'system' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('system')}
              className={`gap-2 ${view === 'system' ? 'bg-primary text-white' : ''}`}
            >
              <Shield className="w-4 h-4" />
              System Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {view === 'customer' && <CustomerApp />}
        {view === 'admin' && <AdminDashboard />}
        {view === 'system' && <SystemAdminDashboard />}
      </div>
    </div>
  );
}