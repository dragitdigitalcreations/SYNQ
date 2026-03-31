"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  User, Bell, Moon, Sun, Link2, Trash2, Eye, Mail, Smartphone,
} from "lucide-react";

export function SettingsView() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    inApp: true,
    marketing: false,
  });

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Settings" description="Manage your account preferences" />

      <div className="space-y-6">
        {/* Profile */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-text-secondary" />
            <CardTitle>Profile</CardTitle>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar name={session?.user?.name || "User"} src={session?.user?.image} size="lg" />
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Name</label>
                <Input defaultValue={session?.user?.name || ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Email</label>
                <Input defaultValue={session?.user?.email || ""} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Bio</label>
              <Textarea placeholder="Tell others about yourself..." maxLength={280} showCount />
            </div>
            <Button>Save Changes</Button>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-text-secondary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <div className="space-y-4">
            {[
              { key: "email" as const, icon: Mail, label: "Email Notifications", desc: "Receive updates about collaborations via email" },
              { key: "push" as const, icon: Smartphone, label: "Push Notifications", desc: "Browser push notifications for messages" },
              { key: "inApp" as const, icon: Bell, label: "In-App Notifications", desc: "Show notification badges and alerts" },
              { key: "marketing" as const, icon: Mail, label: "Marketing Emails", desc: "Tips, product updates, and community highlights" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{item.label}</p>
                    <p className="text-xs text-text-secondary">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={notifications[item.key]}
                  onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-text-secondary" />
            <CardTitle>Privacy</CardTitle>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Profile Visibility</p>
                <p className="text-xs text-text-secondary">Who can see your profile</p>
              </div>
              <Select defaultValue="public">
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="verified">Verified Users Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            {theme === "dark" ? <Moon className="h-5 w-5 text-text-secondary" /> : <Sun className="h-5 w-5 text-text-secondary" />}
            <CardTitle>Appearance</CardTitle>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Dark Mode</p>
              <p className="text-xs text-text-secondary">Toggle between dark and light theme</p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </Card>

        {/* Connected Accounts */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="h-5 w-5 text-text-secondary" />
            <CardTitle>Connected Accounts</CardTitle>
          </div>
          <div className="space-y-3">
            {[
              { name: "Google", connected: true },
              { name: "Instagram", connected: false },
              { name: "YouTube", connected: false },
            ].map((account) => (
              <div key={account.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm font-medium text-text-primary">{account.name}</span>
                {account.connected ? (
                  <Badge variant="success">Connected</Badge>
                ) : (
                  <Button variant="outline" size="sm">Connect</Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-error/20">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="h-5 w-5 text-error" />
            <CardTitle className="text-error">Danger Zone</CardTitle>
          </div>
          <CardDescription className="mb-4">
            Once you delete your account, there is no going back. All data will be permanently removed.
          </CardDescription>
          <Button variant="destructive">Delete Account</Button>
        </Card>
      </div>
    </div>
  );
}
