import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  message_id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
}

export default function Conversation() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      message_id: "1",
      sender: "agent",
      content: "Hello! I'm the ADDED AI Agent. How can I assist you with your TBRD generation today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      message_id: Date.now().toString(),
      sender: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        message_id: (Date.now() + 1).toString(),
        sender: "agent",
        content: "I understand your request. Let me help you with that.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conversation</h1>
        <p className="text-muted-foreground">
          Chat with the AI agent about your cases and requirements
        </p>
      </div>

      <Card className="shadow-md h-[calc(100vh-16rem)] flex flex-col">
        <CardHeader>
          <CardTitle>AI Agent Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.message_id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={msg.sender === "agent" ? "bg-primary text-primary-foreground" : "bg-muted"}>
                    {msg.sender === "agent" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="min-h-[60px] resize-none"
            />
            <Button onClick={handleSend} size="icon" className="h-[60px] w-[60px]">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
