
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Users, Gavel, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DebateSetupProps {
  onBack: () => void;
}

const DebateSetup = ({ onBack }: DebateSetupProps) => {
  const [debateType, setDebateType] = useState<string>("");
  const [side, setSide] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!debateType || !side || !topic.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to start your debate practice.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically start the debate simulation
    toast({
      title: "Debate Setup Complete!",
      description: `Starting ${debateType} debate on "${topic}" arguing ${side}.`,
    });
    
    console.log("Debate configuration:", {
      debateType,
      side,
      topic
    });
  };

  const isFormValid = debateType && side && topic.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white hover:text-gray-300 mb-6 p-2"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Setup Your Debate
          </h1>
          <p className="text-xl text-gray-300">
            Configure your practice session and let's get started!
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center space-x-2">
              <Gavel className="w-6 h-6 text-blue-400" />
              <span>Debate Configuration</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Debate Type Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>Type of Debate</span>
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      value: "Asian Parliamentary",
                      title: "Asian Parliamentary",
                      description: "3 speakers per team, 7-minute speeches",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      value: "British Parliamentary",
                      title: "British Parliamentary",
                      description: "4 teams, 7-minute speeches, complex dynamics",
                      color: "from-purple-500 to-pink-500"
                    }
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setDebateType(type.value)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                        debateType === type.value
                          ? 'border-white bg-white/20 shadow-lg'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${type.color} flex items-center justify-center mb-3`}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                      <p className="text-gray-300 text-sm">{type.description}</p>
                      {debateType === type.value && (
                        <CheckCircle2 className="w-6 h-6 text-green-400 float-right mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Side Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-white flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  <span>Choose Your Side</span>
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      value: "For",
                      title: "Proposition (For)",
                      description: "Argue in favor of the motion",
                      color: "from-green-500 to-emerald-500",
                      icon: "👍"
                    },
                    {
                      value: "Against",
                      title: "Opposition (Against)",
                      description: "Argue against the motion",
                      color: "from-red-500 to-orange-500",
                      icon: "👎"
                    }
                  ].map((sideOption) => (
                    <button
                      key={sideOption.value}
                      type="button"
                      onClick={() => setSide(sideOption.value)}
                      className={`p-6 rounded-xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                        side === sideOption.value
                          ? 'border-white bg-white/20 shadow-lg'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${sideOption.color} flex items-center justify-center mb-3 text-2xl`}>
                        {sideOption.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{sideOption.title}</h3>
                      <p className="text-gray-300 text-sm">{sideOption.description}</p>
                      {side === sideOption.value && (
                        <CheckCircle2 className="w-6 h-6 text-green-400 float-right mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Input */}
              <div className="space-y-4">
                <Label htmlFor="topic" className="text-lg font-semibold text-white">
                  Debate Topic
                </Label>
                <div className="relative">
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter the debate topic or motion..."
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 py-3 px-4 text-lg rounded-xl"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Example: "This house believes that social media does more harm than good"
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                    isFormValid
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isFormValid ? 'Start Debate Practice' : 'Please Complete All Fields'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Step 1 of 2: Setup Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateSetup;
