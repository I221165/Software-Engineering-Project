"use client"

import { AdviceReport } from "@/components/bank-manager/advice-report";
import { useParams } from "next/navigation";

export default function AdviceReportPage() {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <div className="container mx-auto py-6">
      <AdviceReport clientId={clientId} />
    </div>
  );
} 