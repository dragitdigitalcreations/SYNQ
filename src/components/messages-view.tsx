"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Send, Paperclip, Search, ArrowLeft, Check, CheckCheck } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  avatar: string | null;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "me" | "them";
  time: string;
  read: boolean;
  type: "text" | "system";
}

const mockConversations: Conversation[] = [
  { id: "1", name: "StyleCraft", avatar: null, lastMessage: "Great work on the photos!", time: "2m ago", unread: 2, online: true },
  { id: "2", name: "TechGear India", avatar: null, lastMessage: "Can we discuss the deliverables?", time: "1h ago", unread: 0, online: false },
  { id: "3", name: "FreshBites", avatar: null, lastMessage: "Payment has been released", time: "3h ago", unread: 1, online: true },
  { id: "4", name: "FitLife Studio", avatar: null, lastMessage: "Interested, let's discuss", time: "1d ago", unread: 0, online: false },
  { id: "5", name: "Wanderlust Travel", avatar: null, lastMessage: "We'd love to collaborate!", time: "2d ago", unread: 0, online: false },
];

const mockMessages: ChatMessage[] = [
  { id: "1", content: "Hi Priya! We loved your portfolio. Would you be interested in collaborating on our Summer Fashion Collection?", sender: "them", time: "10:30 AM", read: true, type: "text" },
  { id: "2", content: "Hey! Thanks for reaching out. I'd love to know more about the campaign. What are the deliverables?", sender: "me", time: "10:45 AM", read: true, type: "text" },
  { id: "3", content: "We need 3 Reels, 5 Stories, and 10 product photos. Budget is ₹60,000 total. Timeline is 6 weeks.", sender: "them", time: "11:00 AM", read: true, type: "text" },
  { id: "4", content: "That sounds great! The budget works for me. Can you send over the creative brief?", sender: "me", time: "11:15 AM", read: true, type: "text" },
  { id: "5", content: "Scope card shared for \"Summer Fashion Collection Launch\"", sender: "them", time: "11:30 AM", read: true, type: "system" },
  { id: "6", content: "Perfect! I've reviewed the scope card and it looks good. I'll accept and we can get started.", sender: "me", time: "11:45 AM", read: true, type: "text" },
  { id: "7", content: "Great work on the photos! The brand team is very happy with the quality.", sender: "them", time: "2:00 PM", read: false, type: "text" },
];

const quickReplies = [
  "Interested, let's discuss",
  "Not available right now",
  "Need more details",
  "Send me the brief",
];

export function MessagesView() {
  const [selectedConv, setSelectedConv] = useState<string>("1");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConvList, setShowConvList] = useState(true);

  const filteredConvs = mockConversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessageText("");
  };

  return (
    <div className="flex flex-1 min-h-0 -m-4 md:-m-6">
      {/* Conversation List */}
      <div className={cn(
        "w-full md:w-80 border-r border-border flex flex-col bg-surface",
        !showConvList && "hidden md:flex"
      )}>
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Messages</h2>
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => (
            <button
              key={conv.id}
              onClick={() => { setSelectedConv(conv.id); setShowConvList(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-elevated transition-colors text-left",
                selectedConv === conv.id && "bg-surface-elevated"
              )}
            >
              <div className="relative">
                <Avatar name={conv.name} size="md" />
                {conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-surface" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text-primary truncate">{conv.name}</p>
                  <span className="text-xs text-text-secondary">{conv.time}</span>
                </div>
                <p className="text-xs text-text-secondary truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col",
        showConvList && "hidden md:flex"
      )}>
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface">
          <button
            onClick={() => setShowConvList(true)}
            className="md:hidden p-1 rounded-md text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Avatar name={mockConversations.find((c) => c.id === selectedConv)?.name || ""} size="sm" />
          <div>
            <p className="text-sm font-medium text-text-primary">
              {mockConversations.find((c) => c.id === selectedConv)?.name}
            </p>
            <p className="text-xs text-text-secondary">
              {mockConversations.find((c) => c.id === selectedConv)?.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockMessages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}
            >
              {msg.type === "system" ? (
                <div className="rounded-lg bg-surface-elevated border border-border px-4 py-2 text-xs text-text-secondary text-center max-w-sm">
                  {msg.content}
                </div>
              ) : (
                <div className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5",
                  msg.sender === "me"
                    ? "bg-accent text-white rounded-br-md"
                    : "bg-surface-elevated text-text-primary rounded-bl-md"
                )}>
                  <p className="text-sm">{msg.content}</p>
                  <div className={cn(
                    "flex items-center justify-end gap-1 mt-1",
                    msg.sender === "me" ? "text-white/60" : "text-text-secondary"
                  )}>
                    <span className="text-[10px]">{msg.time}</span>
                    {msg.sender === "me" && (
                      msg.read ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => setMessageText(reply)}
              className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-text-secondary hover:border-accent hover:text-accent transition-all"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-surface">
          <Button variant="ghost" size="icon" aria-label="Attach file">
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
          <Button size="icon" onClick={handleSend} disabled={!messageText.trim()} aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
