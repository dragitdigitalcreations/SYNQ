"use client";

import { useParams } from "next/navigation";
import { CampaignDetails } from "@/components/dashboard/campaign-details";

export default function CreatorCampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;

  return <CampaignDetails campaignId={campaignId} role="creator" />;
}
