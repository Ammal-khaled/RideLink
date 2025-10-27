import React, { useState } from 'react';
import { Settings, Globe, Shield, DollarSign, Bell, Database, Users, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    // Platform Settings
    platformName: 'RideLink',
    platformVersion: '2.1.0',
    maintenanceMode: false,
    newRegistrations: true,
    
    // Commission & Pricing
    commissionRate: 15,
    minCommission: 5,
    currency: 'JOD',
    taxRate: 16,
    
    // Security Settings
    maxLoginAttempts: 5,
    sessionTimeout: 120,
    twoFactorAuth: true,
    passwordExpiry: 90,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    systemAlerts: true,
    
    // Business Rules
    autoApprovalThreshold: 10000,
    reviewModerationEnabled: true,
    minimumRating: 3.0,
    maximumStoresPerAdmin: 3,
    
    // API & Integration
    rateLimiting: true,
    apiVersion: 'v2',
    backupFrequency: 'daily',
    logRetention: 30
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    alert('System settings saved successfully!');
  };

  const handleBackupData = () => {
    alert('Data backup initiated. You will be notified when complete.');
  };

  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all system logs? This action cannot be undone.')) {
      alert('System logs cleared successfully.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-muted-foreground">Configure platform-wide settings and policies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Configuration */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600" />
              Platform Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleSettingChange('platformName', e.target.value)}
                className="rounded-xl"
              />
            </div>
            
            <div>
              <Label htmlFor="platformVersion">Current Version</Label>
              <Input
                id="platformVersion"
                value={settings.platformVersion}
                disabled
                className="rounded-xl bg-gray-50"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">Disable platform for maintenance</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Registrations</p>
                <p className="text-sm text-muted-foreground">Allow new store registrations</p>
              </div>
              <Switch
                checked={settings.newRegistrations}
                onCheckedChange={(checked) => handleSettingChange('newRegistrations', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Commission & Pricing */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              Commission & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                value={settings.commissionRate}
                onChange={(e) => handleSettingChange('commissionRate', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <div>
              <Label htmlFor="minCommission">Minimum Commission ({settings.currency})</Label>
              <Input
                id="minCommission"
                type="number"
                value={settings.minCommission}
                onChange={(e) => handleSettingChange('minCommission', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <div>
              <Label htmlFor="currency">Platform Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange('currency', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JOD">JOD (Jordanian Dinar)</SelectItem>
                  <SelectItem value="USD">USD (US Dollar)</SelectItem>
                  <SelectItem value="EUR">EUR (Euro)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleSettingChange('taxRate', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for all admins</p>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={settings.passwordExpiry}
                onChange={(e) => handleSettingChange('passwordExpiry', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-600" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">System-wide email alerts</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Mobile app notifications</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Alerts</p>
                <p className="text-sm text-muted-foreground">Internal system notifications</p>
              </div>
              <Switch
                checked={settings.systemAlerts}
                onCheckedChange={(checked) => handleSettingChange('systemAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Rules */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Business Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="autoApprovalThreshold">Auto-Approval Threshold ({settings.currency})</Label>
              <Input
                id="autoApprovalThreshold"
                type="number"
                value={settings.autoApprovalThreshold}
                onChange={(e) => handleSettingChange('autoApprovalThreshold', Number(e.target.value))}
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Bookings below this amount are auto-approved
              </p>
            </div>
            
            <div>
              <Label htmlFor="minimumRating">Minimum Store Rating</Label>
              <Input
                id="minimumRating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={settings.minimumRating}
                onChange={(e) => handleSettingChange('minimumRating', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <div>
              <Label htmlFor="maxStoresPerAdmin">Max Stores per Admin</Label>
              <Input
                id="maxStoresPerAdmin"
                type="number"
                value={settings.maximumStoresPerAdmin}
                onChange={(e) => handleSettingChange('maximumStoresPerAdmin', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Review Moderation</p>
                <p className="text-sm text-muted-foreground">Enable review content filtering</p>
              </div>
              <Switch
                checked={settings.reviewModerationEnabled}
                onCheckedChange={(checked) => handleSettingChange('reviewModerationEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Operations */}
        <Card className="shadow-card rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-600" />
              System Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="logRetention">Log Retention (days)</Label>
              <Input
                id="logRetention"
                type="number"
                value={settings.logRetention}
                onChange={(e) => handleSettingChange('logRetention', Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">API Rate Limiting</p>
                <p className="text-sm text-muted-foreground">Enable API request limits</p>
              </div>
              <Switch
                checked={settings.rateLimiting}
                onCheckedChange={(checked) => handleSettingChange('rateLimiting', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button
                onClick={handleBackupData}
                variant="outline"
                className="w-full gap-2 rounded-xl"
              >
                <Database className="w-4 h-4" />
                Backup Data Now
              </Button>
              
              <Button
                onClick={handleClearLogs}
                variant="outline"
                className="w-full gap-2 text-orange-600 hover:bg-orange-50 rounded-xl"
              >
                <Activity className="w-4 h-4" />
                Clear System Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Global Actions */}
      <Card className="shadow-card rounded-card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-purple-800 mb-1">System Configuration</h3>
              <p className="text-sm text-purple-600">
                Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>
            <Button 
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl px-8"
            >
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}