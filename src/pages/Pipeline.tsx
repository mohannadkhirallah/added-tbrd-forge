import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

type PipelineStep = "idle" | "analysis" | "sections" | "generation" | "completed" | "failed";

export default function Pipeline() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PipelineStep>("idle");
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { key: "analysis", label: "Analysis", description: "Analyzing BRD content" },
    { key: "sections", label: "Sections", description: "Proposing TBRD sections" },
    { key: "generation", label: "Generation", description: "Generating TBRD content" },
  ];

  const runPipeline = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Simulate pipeline execution
    const stepSequence: PipelineStep[] = ["analysis", "sections", "generation", "completed"];
    
    for (let i = 0; i < stepSequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCurrentStep(stepSequence[i]);
      setProgress(((i + 1) / stepSequence.length) * 100);
      
      if (stepSequence[i] !== "completed") {
        toast.success(`${steps[i].label} completed`);
      }
    }
    
    toast.success("TBRD generated successfully!");
    setIsRunning(false);
  };

  const getStepStatus = (stepKey: string) => {
    const stepIndex = steps.findIndex((s) => s.key === stepKey);
    const currentIndex = steps.findIndex((s) => s.key === currentStep);
    
    if (currentStep === "completed" || currentIndex > stepIndex) {
      return "completed";
    } else if (currentIndex === stepIndex) {
      return "running";
    } else {
      return "pending";
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "running":
        return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/cases/${caseId}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pipeline</h1>
          <p className="text-muted-foreground">
            Generate TBRD from your uploaded BRD
          </p>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pipeline Execution</CardTitle>
            {currentStep === "completed" && (
              <Badge variant="default" className="bg-success">
                Completed
              </Badge>
            )}
            {currentStep === "failed" && (
              <Badge variant="destructive">Failed</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Pipeline Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(step.key);
              return (
                <div
                  key={step.key}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getStepIcon(status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{step.label}</h3>
                      {status === "running" && (
                        <Badge variant="secondary" className="text-xs">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {currentStep === "idle" || currentStep === "failed" ? (
              <Button
                onClick={runPipeline}
                disabled={isRunning}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Pipeline...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Pipeline
                  </>
                )}
              </Button>
            ) : currentStep === "completed" ? (
              <Button
                onClick={() => navigate(`/cases/${caseId}/tbrd`)}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                View TBRD
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
