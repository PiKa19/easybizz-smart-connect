
import React, { useState, useContext } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  Camera,
  Lock,
  Globe,
  Moon,
  Sun,
  Smartphone,
  LogOut,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LanguageContext } from '@/contexts/LanguageContext';

const SettingsSection = () => {
  const { t } = useContext(LanguageContext);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Account Settings
    fullName: "Baraka Store Owner",
    email: "baraka@example.com",
    phone: "+1234567890",
    language: "en",
    theme: "light",
    
    // Security Settings
    twoFactorEnabled: false,
    pinCodeEnabled: true,
    sessionTimeout: 30,
    
    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    
    // Current Plan
    currentPlan: "Premium",
    usage: {
      products: 150,
      transactions: 1250,
      storage: "2.5 GB"
    }
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const mockDevices = [
    {
      id: 1,
      name: "Chrome on Windows",
      location: "Casablanca, Morocco",
      lastActive: "Currently active",
      current: true
    },
    {
      id: 2,
      name: "Safari on iPhone",
      location: "Rabat, Morocco",
      lastActive: "2 hours ago",
      current: false
    },
    {
      id: 3,
      name: "Firefox on Ubuntu",
      location: "Marrakech, Morocco",
      lastActive: "1 day ago",
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#0794FE] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  B
                </div>
                <div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={settings.fullName}
                    onChange={(e) => handleSettingChange('fullName', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <select 
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>

              {/* Theme Setting */}
              <div>
                <Label className="text-base font-medium">Theme Preference</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant={settings.theme === 'light' ? 'default' : 'outline'}
                    onClick={() => handleSettingChange('theme', 'light')}
                    className="flex items-center gap-2"
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </Button>
                  <Button
                    variant={settings.theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => handleSettingChange('theme', 'dark')}
                    className="flex items-center gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-6">
          <div className="space-y-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            {/* Security Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">PIN Code for Cashier</Label>
                    <p className="text-sm text-gray-500">Require PIN for cashier operations</p>
                  </div>
                  <Switch
                    checked={settings.pinCodeEnabled}
                    onCheckedChange={(checked) => handleSettingChange('pinCodeEnabled', checked)}
                  />
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-32 mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Device Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Device Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDevices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-sm text-gray-500">{device.location}</p>
                          <p className="text-xs text-gray-400">{device.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {device.current && (
                          <Badge variant="secondary">Current</Badge>
                        )}
                        {!device.current && (
                          <Button variant="destructive" size="sm">
                            <LogOut className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <Button variant="destructive" className="w-full">
                  Logout All Devices
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing" className="mt-6">
          <div className="space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{settings.currentPlan} Plan</h3>
                    <p className="text-gray-500">$29.99/month</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{settings.usage.products}</p>
                    <p className="text-sm text-gray-500">Products Listed</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{settings.usage.transactions}</p>
                    <p className="text-sm text-gray-500">Transactions</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{settings.usage.storage}</p>
                    <p className="text-sm text-gray-500">Storage Used</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">Upgrade Plan</Button>
                  <Button variant="outline">Downgrade Plan</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "2024-01-15", amount: "$29.99", status: "Paid", method: "Credit Card" },
                    { date: "2023-12-15", amount: "$29.99", status: "Paid", method: "Credit Card" },
                    { date: "2023-11-15", amount: "$29.99", status: "Paid", method: "PayPal" }
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{payment.date}</p>
                        <p className="text-sm text-gray-500">{payment.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Settings */}
        <TabsContent value="support" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Help & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  User Guide & Tutorials
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Report a Bug
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Request a Feature
                </Button>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About EasyBizz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Version:</strong> 2.1.0</p>
                  <p><strong>Build:</strong> 20240115</p>
                  <p><strong>Last Updated:</strong> January 15, 2024</p>
                  <p className="text-sm text-gray-500 mt-4">
                    EasyBizz is your comprehensive business management solution for retailers and suppliers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsSection;
