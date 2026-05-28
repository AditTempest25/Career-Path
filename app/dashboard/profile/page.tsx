'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer learning full-stack development and building amazing things.',
    currentRole: 'Junior Frontend Developer',
    targetRole: 'Full Stack Developer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and career goals
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? '' : 'bg-primary hover:bg-primary/90 text-white'}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-4xl">
              {formData.firstName[0]}{formData.lastName[0]}
            </div>
            {isEditing && (
              <Button variant="outline" type="button" size="sm">
                Change Avatar
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="currentRole" className="text-sm font-medium">
                Current Role
              </Label>
              <Input
                id="currentRole"
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="targetRole" className="text-sm font-medium">
                Target Role
              </Label>
              <Input
                id="targetRole"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="mt-2 w-full px-3 py-2 border border-border rounded-lg text-sm disabled:bg-muted disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {isEditing && (
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              Save Changes
            </Button>
          )}
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground font-sans mb-4">Skills & Expertise</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Proficient</p>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'CSS', 'HTML'].map((skill, i) => (
                <span key={i} className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Learning</p>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Python', 'SQL', 'Docker'].map((skill, i) => (
                <span key={i} className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground font-sans mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Week', icon: '🚀', desc: 'Started your journey' },
            { name: 'Streak 7', icon: '🔥', desc: '7 day streak' },
            { name: 'Simulator Master', icon: '🎯', desc: '10 simulators completed' },
            { name: 'Portfolio Pro', icon: '📁', desc: '5 projects showcased' },
          ].map((achievement, i) => (
            <div key={i} className="text-center p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
              <p className="text-3xl mb-2">{achievement.icon}</p>
              <p className="font-semibold text-sm text-foreground">{achievement.name}</p>
              <p className="text-xs text-muted-foreground">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
