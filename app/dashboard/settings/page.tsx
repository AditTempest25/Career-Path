'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    progressUpdates: true,
    newChallenges: true,
    weeklyReport: false,
    darkMode: false,
    privateProfile: false,
    dataAnalytics: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground font-sans mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about your progress</p>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">Progress Updates</p>
              <p className="text-sm text-muted-foreground">Get notified when you complete challenges</p>
            </div>
            <button
              onClick={() => handleToggle('progressUpdates')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.progressUpdates ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.progressUpdates ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">New Challenges</p>
              <p className="text-sm text-muted-foreground">Notifications about new work simulators</p>
            </div>
            <button
              onClick={() => handleToggle('newChallenges')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.newChallenges ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.newChallenges ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">Weekly Report</p>
              <p className="text-sm text-muted-foreground">Get a summary of your weekly activity</p>
            </div>
            <button
              onClick={() => handleToggle('weeklyReport')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.weeklyReport ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.weeklyReport ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground font-sans mb-6">Appearance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Use dark theme for better visibility at night</p>
            </div>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.darkMode ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground font-sans mb-6">Privacy</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Private Profile</p>
              <p className="text-sm text-muted-foreground">Hide your profile from other users</p>
            </div>
            <button
              onClick={() => handleToggle('privateProfile')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.privateProfile ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.privateProfile ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="font-medium text-foreground">Data Analytics</p>
              <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
            </div>
            <button
              onClick={() => handleToggle('dataAnalytics')}
              className={`relative inline-flex h-8 w-14 rounded-full transition-colors ${
                settings.dataAnalytics ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`h-7 w-7 transform rounded-full bg-white shadow transition-transform ${
                  settings.dataAnalytics ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-red-200 bg-red-50">
        <h2 className="text-xl font-bold text-red-900 font-sans mb-4">Danger Zone</h2>
        <p className="text-sm text-red-800 mb-4">
          These actions are irreversible. Please be careful.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
            Download My Data
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Delete Account
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground font-sans mb-4">Need Help?</h2>
        <div className="space-y-3 text-sm">
          <p>
            Have questions or need support?{' '}
            <a href="#" className="text-primary hover:text-primary/90 font-semibold">
              Contact our support team
            </a>
          </p>
          <p>
            Check out our{' '}
            <a href="#" className="text-primary hover:text-primary/90 font-semibold">
              FAQ section
            </a>
            {' '}for common questions
          </p>
        </div>
      </Card>
    </div>
  );
}
