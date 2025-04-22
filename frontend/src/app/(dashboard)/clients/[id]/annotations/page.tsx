"use client"

import { PortfolioAnnotations } from "@/components/bank-manager/portfolio-annotations";
import { useParams } from "next/navigation";

export default function PortfolioAnnotationsPage() {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <div className="container mx-auto py-6">
      <PortfolioAnnotations clientId={clientId} />
    </div>
  );
} 