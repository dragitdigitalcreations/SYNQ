"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MultiSelect } from "@/components/forms/multi-select";
import { RangeSlider } from "@/components/forms/range-slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CONTENT_VERTICALS } from "@/types";
import { formatCurrency, getMatchScoreColor } from "@/lib/utils";
import { Search, MapPin, Users, Send, Eye, Filter, Info } from "lucide-react";
import Link from "next/link";

const mockCreators = [
  { id: "1", name: "Priya Sharma", avatar: null, location: "Mumbai, Maharashtra", bio: "Fashion & lifestyle content creator. 500K+ on Instagram.", verticals: ["Fashion", "Lifestyle"], followers: 520000, engagementRate: 4.8, matchScore: 92, matchReason: "Strong audience overlap in 18-25 age group. Fashion vertical match. Budget fits rate card.", minBudget: 8000, responseTime: 2, onTimeRate: 98, availability: "OPEN" },
  { id: "2", name: "Arjun Mehta", avatar: null, location: "Bangalore, Karnataka", bio: "Tech reviewer & gadget enthusiast. YouTube focused.", verticals: ["Tech", "Gaming"], followers: 180000, engagementRate: 5.2, matchScore: 85, matchReason: "Tech vertical perfect match. High engagement rate. Active and responsive.", minBudget: 10000, responseTime: 1, onTimeRate: 95, availability: "OPEN" },
  { id: "3", name: "Sneha Reddy", avatar: null, location: "Hyderabad, Telangana", bio: "Fitness & wellness coach. Creating health content.", verticals: ["Fitness", "Health"], followers: 95000, engagementRate: 6.1, matchScore: 78, matchReason: "Fitness content alignment. Very high engagement rate. Regional audience match.", minBudget: 5000, responseTime: 3, onTimeRate: 92, availability: "SELECTIVE" },
  { id: "4", name: "Rahul Kapoor", avatar: null, location: "Delhi NCR", bio: "Food blogger & restaurant reviewer. 300K followers.", verticals: ["Food", "Travel"], followers: 310000, engagementRate: 3.9, matchScore: 73, matchReason: "Food vertical match. Good reach in target region. Budget in range.", minBudget: 6000, responseTime: 4, onTimeRate: 88, availability: "OPEN" },
  { id: "5", name: "Ananya Iyer", avatar: null, location: "Chennai, Tamil Nadu", bio: "Beauty & skincare creator. Brand collaborations specialist.", verticals: ["Beauty", "Fashion"], followers: 240000, engagementRate: 4.3, matchScore: 68, matchReason: "Beauty content aligns. Moderate audience overlap. Good collaboration history.", minBudget: 7000, responseTime: 5, onTimeRate: 90, availability: "OPEN" },
  { id: "6", name: "Vikram Singh", avatar: null, location: "Jaipur, Rajasthan", bio: "Travel photographer & storyteller. National Geographic featured.", verticals: ["Travel", "Photography"], followers: 420000, engagementRate: 3.5, matchScore: 62, matchReason: "Photography skills match. Travel content relevant. Budget slightly below preference.", minBudget: 12000, responseTime: 6, onTimeRate: 85, availability: "SELECTIVE" },
];

export default function FindCreatorsPage() {
  const [search, setSearch] = useState("");
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockCreators
    .filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedVerticals.length > 0 && !c.verticals.some((v) => selectedVerticals.includes(v))) return false;
      if (c.minBudget > budgetRange) return false;
      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <TooltipProvider>
      <div>
        <PageHeader
          title="Find Creators"
          description="Discover and connect with creators matched to your needs"
        />

        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search creators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            <Card className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Content Verticals</label>
                <MultiSelect options={CONTENT_VERTICALS} selected={selectedVerticals} onChange={setSelectedVerticals} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Max Budget per Creator</label>
                <RangeSlider min={1000} max={200000} value={budgetRange} onChange={setBudgetRange} step={1000} />
              </div>
            </Card>
          </motion.div>
        )}

        <div className="mb-4 flex items-center gap-2 text-sm text-text-secondary">
          <Info className="h-4 w-4" />
          You can send up to 5 collaboration requests at a time. This keeps outreach intentional.
        </div>

        <div className="space-y-3">
          {filtered.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-5 hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-4">
                  <Avatar name={creator.name} size="lg" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary">{creator.name}</h3>
                      <Badge variant={creator.availability === "OPEN" ? "success" : "warning"}>
                        {creator.availability === "OPEN" ? "Available" : "Selective"}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {creator.location}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">{creator.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {creator.verticals.map((v) => <Badge key={v} variant="outline">{v}</Badge>)}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {(creator.followers / 1000).toFixed(0)}K followers</span>
                      <span>{creator.engagementRate}% engagement</span>
                      <span>From {formatCurrency(creator.minBudget)}</span>
                      <span>{creator.responseTime}h avg response</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className={`text-lg font-bold font-mono ${getMatchScoreColor(creator.matchScore)}`}>
                          {creator.matchScore}%
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="font-medium mb-1">{creator.matchScore}% match</p>
                        <p className="text-xs text-text-secondary">{creator.matchReason}</p>
                      </TooltipContent>
                    </Tooltip>
                    <div className="flex gap-2">
                      <Link href={`/creators/${creator.id}`}>
                        <Button variant="outline" size="sm" className="gap-1"><Eye className="h-3 w-3" /> Profile</Button>
                      </Link>
                      <Button size="sm" className="gap-1"><Send className="h-3 w-3" /> Send Brief</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary">No creators match your filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
