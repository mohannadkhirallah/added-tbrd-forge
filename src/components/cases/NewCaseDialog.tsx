import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface NewCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCaseDialog({ open, onOpenChange }: NewCaseDialogProps) {
  const [caseName, setCaseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseName.trim()) {
      toast.error("Please enter a case name");
      return;
    }

    setIsLoading(true);
    
    // TODO: API call to create case
    // await apiRequest(`/cases?name=${encodeURIComponent(caseName)}`, { method: "POST" });
    
    setTimeout(() => {
      toast.success(`Case "${caseName}" created successfully`);
      setCaseName("");
      onOpenChange(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Case</DialogTitle>
            <DialogDescription>
              Enter a name for your new case. You can upload BRDs and generate TBRDs after creation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="caseName">Case Name</Label>
              <Input
                id="caseName"
                placeholder="e.g., Mobile Banking App Redesign"
                value={caseName}
                onChange={(e) => setCaseName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Case"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
