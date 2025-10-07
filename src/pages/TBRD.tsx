import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Download, Printer, Save, Wand2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function TBRD() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sections");
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Mock sections data
  const sections = [
    {
      section_item_id: "1",
      section_key: "executive_summary",
      title: "Executive Summary",
      guidance: "Provide a high-level overview of the project",
      content: "This project aims to develop a mobile banking application that provides users with secure, convenient access to their financial accounts...",
      order: 1,
      locked: false,
    },
    {
      section_item_id: "2",
      section_key: "functional_requirements",
      title: "Functional Requirements",
      guidance: "Detail the specific functionalities the system must provide",
      content: "1. User Authentication\n- The system shall support multi-factor authentication\n- OAuth 2.0 integration with social providers\n\n2. Account Management\n- View account balances and transaction history\n- Transfer funds between accounts...",
      order: 2,
      locked: false,
    },
    {
      section_item_id: "3",
      section_key: "non_functional_requirements",
      title: "Non-Functional Requirements",
      guidance: "Specify quality attributes and constraints",
      content: "Performance:\n- System must handle 10,000 concurrent users\n- Response time under 200ms for 95% of requests\n\nSecurity:\n- All data encrypted in transit and at rest\n- Compliance with PCI-DSS standards...",
      order: 3,
      locked: false,
    },
  ];

  const handleSave = (sectionId: string, content: string) => {
    // TODO: API call to save section
    toast.success("Section saved successfully");
    setEditingSection(null);
  };

  const handleAIEdit = (sectionKey: string) => {
    // TODO: Open AI edit dialog
    toast.success("AI editing feature coming soon");
  };

  const handleExport = () => {
    toast.success("Exporting TBRD...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/cases/${caseId}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Technical BRD</h1>
          <p className="text-muted-foreground">
            Review and edit your generated TBRD
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-6 pt-6">
              <TabsList>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="full">Full Document</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sections" className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {sections.map((section) => (
                  <AccordionItem key={section.section_item_id} value={section.section_key}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {section.guidance && (
                          <p className="text-sm text-muted-foreground italic">
                            {section.guidance}
                          </p>
                        )}
                        
                        {editingSection === section.section_item_id ? (
                          <div className="space-y-2">
                            <Textarea
                              defaultValue={section.content}
                              className="min-h-[200px] font-mono text-sm"
                              id={`edit-${section.section_item_id}`}
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  const textarea = document.getElementById(
                                    `edit-${section.section_item_id}`
                                  ) as HTMLTextAreaElement;
                                  handleSave(section.section_item_id, textarea.value);
                                }}
                                size="sm"
                              >
                                <Save className="mr-2 h-4 w-4" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSection(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="whitespace-pre-wrap text-sm bg-muted/50 p-4 rounded-lg">
                              {section.content}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingSection(section.section_item_id)}
                              >
                                Edit Manually
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAIEdit(section.section_key)}
                              >
                                <Wand2 className="mr-2 h-4 w-4" />
                                AI Edit
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="full" className="p-6">
              <div className="prose prose-sm max-w-none">
                <h1>Technical Business Requirements Document</h1>
                <h2>Mobile Banking Application</h2>
                
                {sections.map((section) => (
                  <div key={section.section_item_id}>
                    <h3>{section.title}</h3>
                    <div className="whitespace-pre-wrap">{section.content}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
