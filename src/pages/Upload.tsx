import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Upload() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ingested, setIngested] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    
    if (droppedFile && droppedFile.type === "application/pdf") {
      if (droppedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(droppedFile);
    } else {
      toast.error("Please upload a PDF file");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // TODO: Actual API call
    // await apiUpload(`/cases/${caseId}/documents`, file);
    
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      toast.success("BRD uploaded successfully");
      
      // Auto-trigger ingest
      setTimeout(() => {
        setIngested(true);
        toast.success("Document ingested successfully");
        setUploading(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/cases/${caseId}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload BRD</h1>
          <p className="text-muted-foreground">
            Upload a Business Requirements Document for analysis
          </p>
        </div>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                Drop your BRD PDF here or click to browse
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Maximum file size: 10MB
              </p>
              <input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {ingested && (
                  <CheckCircle2 className="h-6 w-6 text-success" />
                )}
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {progress < 100 ? "Uploading..." : ingested ? "Completed" : "Processing..."}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {!uploading && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleUpload}
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                  >
                    Upload & Ingest
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setFile(null)}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {ingested && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate(`/cases/${caseId}/pipeline`)}
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                  >
                    Generate TBRD
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
