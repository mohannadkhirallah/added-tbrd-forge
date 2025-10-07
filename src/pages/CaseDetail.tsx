import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Play, FileText, ArrowLeft } from "lucide-react";

export default function CaseDetail() {
  const { caseId } = useParams();
  const navigate = useNavigate();

  // Mock data
  const case_ = {
    case_id: caseId,
    name: "Mobile Banking App",
    status: "draft" as const,
    created_at: "2025-01-05T10:30:00Z",
    updated_at: "2025-01-05T14:45:00Z",
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      completed: { variant: "default", label: "Completed" },
      processing: { variant: "secondary", label: "Processing" },
      draft: { variant: "outline", label: "Draft" },
      failed: { variant: "destructive", label: "Failed" },
    };
    const config = variants[status] || variants.draft;
    return (
      <Badge variant={config.variant} className="capitalize">
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/cases")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{case_.name}</h1>
            {getStatusBadge(case_.status)}
          </div>
          <p className="text-muted-foreground">
            Case ID: {case_.case_id}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-md hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/cases/${caseId}/upload`)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upload BRD</CardTitle>
            <Upload className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Upload and ingest BRD documents for analysis
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/cases/${caseId}/pipeline`)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Run Pipeline</CardTitle>
            <Play className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Execute the AI pipeline to generate TBRD
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
              onClick={() => navigate(`/cases/${caseId}/tbrd`)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View TBRD</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Review and edit the generated TBRD
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created</p>
              <p className="text-sm">
                {new Date(case_.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="text-sm">
                {new Date(case_.updated_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
