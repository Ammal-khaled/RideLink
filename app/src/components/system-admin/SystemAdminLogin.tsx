import React, { useState } from 'react';
import { Shield, User, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SystemAdminLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

export function SystemAdminLogin({ onLogin }: SystemAdminLoginProps) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-modal border-purple-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-purple-800">System Administrator</CardTitle>
          <p className="text-muted-foreground">Access platform-wide controls</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="pl-10 rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 rounded-xl border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl py-3 text-lg"
            >
              Access System
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-sm text-center text-purple-700">
              Demo Credentials:<br />
              <span className="font-medium">Username: system</span><br />
              <span className="font-medium">Password: system123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}