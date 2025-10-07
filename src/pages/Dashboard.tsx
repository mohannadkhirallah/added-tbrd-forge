import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, FileText, CheckCircle2, TrendingUp, Clock } from "lucide-react";

export default function Dashboard() {
  // Mock data - will be replaced with real API calls
  const kpis = {
    totalCases: 42,
    brdsUploaded: 38,
    tbrdsGenerated: 35,
    successRate: 92.1,
    avgDuration: 4.2,
  };

  const recentActivity = [
    { id: "1", caseName: "Mobile Banking App", action: "TBRD Generated", timestamp: "2 hours ago" },
    { id: "2", caseName: "Customer Portal", action: "BRD Uploaded", timestamp: "4 hours ago" },
    { id: "3", caseName: "Payment Gateway", action: "Case Created", timestamp: "5 hours ago" },
    { id: "4", caseName: "Analytics Dashboard", action: "TBRD Generated", timestamp: "1 day ago" },
    { id: "5", caseName: "CRM Integration", action: "Pipeline Running", timestamp: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your TBRD generation pipeline
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalCases}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active and completed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BRDs Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.brdsUploaded}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Documents processed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TBRDs Generated</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.tbrdsGenerated}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully completed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.successRate}%</div>
            <p className="text-xs text-success mt-1">
              +2.3% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.avgDuration}m</div>
            <p className="text-xs text-muted-foreground mt-1">
              Generation time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.caseName}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
