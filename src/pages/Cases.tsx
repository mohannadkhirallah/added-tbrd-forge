import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { NewCaseDialog } from "@/components/cases/NewCaseDialog";
import { useNavigate } from "react-router-dom";

export default function Cases() {
  const [showNewCase, setShowNewCase] = useState(false);
  const navigate = useNavigate();

  // Mock data
  const cases = [
    {
      case_id: "1",
      name: "Mobile Banking App",
      status: "completed" as const,
      created_at: "2025-01-05T10:30:00Z",
      updated_at: "2025-01-05T14:45:00Z",
    },
    {
      case_id: "2",
      name: "Customer Portal Redesign",
      status: "processing" as const,
      created_at: "2025-01-06T09:15:00Z",
      updated_at: "2025-01-06T11:20:00Z",
    },
    {
      case_id: "3",
      name: "Payment Gateway Integration",
      status: "draft" as const,
      created_at: "2025-01-07T08:00:00Z",
      updated_at: "2025-01-07T08:00:00Z",
    },
  ];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cases</h1>
          <p className="text-muted-foreground">
            Manage your BRD cases and TBRD generation
          </p>
        </div>
        <Button
          onClick={() => setShowNewCase(true)}
          className="bg-gradient-primary hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((case_) => (
                <TableRow
                  key={case_.case_id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/cases/${case_.case_id}`)}
                >
                  <TableCell className="font-medium">{case_.name}</TableCell>
                  <TableCell>{getStatusBadge(case_.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(case_.created_at)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(case_.updated_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/cases/${case_.case_id}`);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NewCaseDialog open={showNewCase} onOpenChange={setShowNewCase} />
    </div>
  );
}
