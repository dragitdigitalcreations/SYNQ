"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { InnerNav } from "@/components/layout/inner-nav";
import {
  MapPin, CheckCircle, Clock, Star, Repeat, Send, Calendar,
  Instagram, Youtube, Twitter, BarChart3, Users, Zap,
} from "lucide-react";
import Link from "next/link";

// Mock data — in production this would be fetched via API
const mockCreator = {
  id: "1",
  name: "Priya Sharma",
  avatar: null,
  location: "Mumbai, Maharashtra",
  bio: "Fashion & lifestyle content creator with 500K+ followers. I create authentic, visually stunning content that connects brands with Gen-Z and millennial audiences. Specializing in Reels, fashion hauls, and brand storytelling.",
  verified: true,
  verticals: ["Fashion", "Lifestyle", "Beauty"],
  formats: ["Reels", "YouTube Videos", "Stories", "Photography"],
  followers: 520000,
  engagementRate: 4.8,
  responseTime: 2,
  onTimeRate: 98,
  repeatRate: 40,
  completedCollabs: 47,
  availability: "OPEN",
  socialLinks: { instagram: "priyasharma", youtube: "PriyaSharmaOfficial", twitter: "priya_s" },
  rateCard: [
    { format: "Reels", price: 12000 },
    { format: "YouTube Videos", price: 25000 },
    { format: "Stories", price: 5000 },
    { format: "Photography", price: 8000 },
  ],
  badges: ["Fast Responder", "On-Time Delivery", "5+ Repeat Collabs"],
  portfolio: [
    { id: "1", type: "image", url: "/images/placeholder.jpg" },
    { id: "2", type: "image", url: "/images/placeholder.jpg" },
    { id: "3", type: "image", url: "/images/placeholder.jpg" },
    { id: "4", type: "image", url: "/images/placeholder.jpg" },
    { id: "5", type: "image", url: "/images/placeholder.jpg" },
    { id: "6", type: "image", url: "/images/placeholder.jpg" },
  ],
};

export default function CreatorProfilePage() {
  const params = useParams();
  const creator = mockCreator;

  return (
    <div className="min-h-screen bg-background">
      <InnerNav />
      {/* Cover */}
      <div className="h-48 bg-gradient-to-r from-accent/20 to-[#00B8D9]/20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start gap-4 mb-8"
        >
          <Avatar name={creator.name} size="xl" className="ring-4 ring-background h-24 w-24 text-2xl" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-text-primary">{creator.name}</h1>
              {creator.verified && <CheckCircle className="h-5 w-5 text-accent" />}
            </div>
            <p className="text-sm text-text-secondary flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" /> {creator.location}
            </p>
            <p className="text-sm text-text-secondary mt-2 max-w-xl">{creator.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {creator.verticals.map((v) => <Badge key={v} variant="accent">{v}</Badge>)}
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={creator.availability === "OPEN" ? "success" : "warning"} className="self-start">
              <Calendar className="h-3 w-3 mr-1" />
              {creator.availability === "OPEN" ? "Available" : "Selective"}
            </Badge>
            <Button className="gap-2 self-start"><Send className="h-4 w-4" /> Send Brief</Button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
        >
          {[
            { label: "Followers", value: formatNumber(creator.followers), icon: Users },
            { label: "Engagement", value: `${creator.engagementRate}%`, icon: BarChart3 },
            { label: "Response Time", value: `${creator.responseTime}h`, icon: Clock },
            { label: "On-Time Rate", value: `${creator.onTimeRate}%`, icon: Zap },
            { label: "Repeat Rate", value: `${creator.repeatRate}%`, icon: Repeat },
            { label: "Completed", value: `${creator.completedCollabs}`, icon: Star },
          ].map((metric) => (
            <Card key={metric.label} className="p-4 text-center">
              <metric.icon className="h-4 w-4 text-text-secondary mx-auto mb-1" />
              <p className="text-lg font-semibold font-mono text-text-primary">{metric.value}</p>
              <p className="text-xs text-text-secondary">{metric.label}</p>
            </Card>
          ))}
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {creator.badges.map((badge) => (
            <Badge key={badge} variant="success" className="py-1 px-3">
              <CheckCircle className="h-3 w-3 mr-1" /> {badge}
            </Badge>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Portfolio */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Portfolio</h2>
            <div className="grid grid-cols-3 gap-2">
              {creator.portfolio.map((item) => (
                <div key={item.id} className="aspect-square rounded-xl bg-surface-elevated border border-border overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-accent/10 to-[#00B8D9]/10 flex items-center justify-center">
                    <span className="text-xs text-text-secondary">Content</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Card & Social */}
          <div className="space-y-6">
            <Card className="p-5">
              <CardTitle className="text-base mb-3">Rate Card</CardTitle>
              <div className="space-y-2">
                {creator.rateCard.map((item) => (
                  <div key={item.format} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{item.format}</span>
                    <span className="font-mono font-medium text-text-primary">{formatCurrency(item.price)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <CardTitle className="text-base mb-3">Connected Platforms</CardTitle>
              <div className="space-y-2">
                {creator.socialLinks.instagram && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Instagram className="h-4 w-4" /> @{creator.socialLinks.instagram}
                  </div>
                )}
                {creator.socialLinks.youtube && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Youtube className="h-4 w-4" /> {creator.socialLinks.youtube}
                  </div>
                )}
                {creator.socialLinks.twitter && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Twitter className="h-4 w-4" /> @{creator.socialLinks.twitter}
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-5">
              <CardTitle className="text-base mb-3">Collaboration History</CardTitle>
              <p className="text-2xl font-semibold font-mono text-accent">{creator.completedCollabs}</p>
              <p className="text-xs text-text-secondary">completed collaborations</p>
              <p className="text-xs text-text-secondary mt-1">{creator.repeatRate}% repeat rate</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
