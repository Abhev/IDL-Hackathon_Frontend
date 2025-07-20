import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AgentInterfaceProps {
  onBackToHome: () => void;
}

const AgentInterface: React.FC<AgentInterfaceProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Simple Header */}
      <header className="border-b border-white/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={onBackToHome}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Simple iframe container */}
      <div className="container mx-auto px-6 py-6 h-[calc(100vh-100px)]">
        <iframe
          src="https://chat.relevanceai.com/form/b0b1b5"
          className="w-full h-full border-0 rounded-lg shadow-xl"
          title="RelevanceAI Chat Interface"
        />
      </div>
    </div>
  );
};

export default AgentInterface;