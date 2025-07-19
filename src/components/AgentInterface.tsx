import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Mic, 
  MicOff, 
  Settings, 
  Save, 
  Download, 
  MessageSquare,
  Activity,
  Timer,
  Target,
  Lightbulb,
  BarChart3,
  Volume2,
  Minimize2,
  Maximize2,
  PanelLeftClose,
  PanelRightClose,
  Home,
  RefreshCw
} from "lucide-react";

interface AgentInterfaceProps {
  onBackToHome: () => void;
}

const AgentInterface = ({ onBackToHome }: AgentInterfaceProps) => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [agentState, setAgentState] = useState<'idle' | 'listening' | 'thinking' | 'responding'>('idle');
  const [argumentStrength, setArgumentStrength] = useState(75);
  const [speakingTime, setSpeakingTime] = useState(142);
  const [confidence, setConfidence] = useState(87);
  const [isMinimized, setIsMinimized] = useState(false);

  // Simulate AI state changes
  useEffect(() => {
    const states: Array<'idle' | 'listening' | 'thinking' | 'responding'> = ['idle', 'listening', 'thinking', 'responding'];
    const interval = setInterval(() => {
      setAgentState(states[Math.floor(Math.random() * states.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStateColor = (state: string) => {
    switch (state) {
      case 'listening': return 'bg-blue-500';
      case 'thinking': return 'bg-purple-500';
      case 'responding': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStateText = (state: string) => {
    switch (state) {
      case 'listening': return 'Listening to your argument...';
      case 'thinking': return 'Analyzing and processing...';
      case 'responding': return 'Preparing response...';
      default: return 'Ready for next interaction';
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-100 via-purple-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Neural Network Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" stroke=\"%23667EEA\" stroke-width=\"1\"%3E%3Cpath d=\"M20 0v40M0 20h40\" opacity=\"0.3\"/%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"3\" fill=\"%23667EEA\" opacity=\"0.6\"/%3E%3C/g%3E%3C/svg%3E')"
        }}
      />

      {/* Top Header - Agent Control Bar */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="text-gray-600 hover:text-gray-900"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getStateColor(agentState)} animate-pulse`}></div>
              <span className="font-medium text-gray-800">DebateMaster AI</span>
              <Badge variant="outline" className="text-xs">
                {agentState.charAt(0).toUpperCase() + agentState.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>{getStateText(agentState)}</span>
          <div className="flex items-center space-x-4">
            <span>Session: 12:34</span>
            <span>Confidence: {confidence}%</span>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Sidebar - Agent Status & Controls */}
        {leftPanelOpen && (
          <div className="w-80 bg-white/70 backdrop-blur-sm border-r border-gray-200/50 p-4 space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Agent Control</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLeftPanelOpen(false)}
              >
                <PanelLeftClose className="w-4 h-4" />
              </Button>
            </div>

            {/* AI Agent Avatar */}
            <Card className="bg-gradient-to-br from-purple-500 to-blue-500">
              <CardContent className="p-4 text-center">
                <div className="relative mx-auto w-20 h-20 mb-3">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <Brain className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStateColor(agentState)} rounded-full border-2 border-white animate-pulse`}></div>
                </div>
                <h4 className="font-semibold text-white">DebateMaster AI</h4>
                <p className="text-sm text-purple-100">Debate Coach & Analyzer</p>
              </CardContent>
            </Card>

            {/* Agent Statistics */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Processing Power</span>
                    <span>{confidence}%</span>
                  </div>
                  <Progress value={confidence} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Accuracy</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Learning Progress</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <h5 className="font-medium mb-3">Quick Actions</h5>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    New Topic
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Hint
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Conversation History */}
            <Card>
              <CardContent className="p-4">
                <h5 className="font-medium mb-3">Recent Sessions</h5>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <div className="font-medium">Climate Change Debate</div>
                    <div className="text-gray-500 text-xs">2 hours ago</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <div className="font-medium">Healthcare Policy</div>
                    <div className="text-gray-500 text-xs">Yesterday</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                    <div className="font-medium">Education Reform</div>
                    <div className="text-gray-500 text-xs">2 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Chat Interface */}
        <div className="flex-1 relative">
          {!leftPanelOpen && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLeftPanelOpen(true)}
              className="absolute top-4 left-4 z-20"
            >
              <PanelLeftClose className="w-4 h-4 rotate-180" />
            </Button>
          )}

          {!rightPanelOpen && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setRightPanelOpen(true)}
              className="absolute top-4 right-4 z-20"
            >
              <PanelRightClose className="w-4 h-4 rotate-180" />
            </Button>
          )}

          {/* Enhanced Chat Container */}
          <div className={`h-full ${isMinimized ? 'p-8' : 'p-4'} transition-all duration-300`}>
            <div className={`h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
              agentState === 'listening' ? 'border-blue-400 shadow-blue-400/30' :
              agentState === 'thinking' ? 'border-purple-400 shadow-purple-400/30' :
              agentState === 'responding' ? 'border-green-400 shadow-green-400/30' :
              'border-gray-200'
            }`}>
              {/* Voice Activity Visualization */}
              <div className="h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20">
                <div className={`h-full transition-all duration-300 ${
                  agentState === 'listening' ? 'bg-blue-400 animate-pulse' :
                  agentState === 'thinking' ? 'bg-purple-400' :
                  agentState === 'responding' ? 'bg-green-400 animate-bounce' :
                  'bg-gray-300'
                }`}></div>
              </div>

              {/* Chat Interface */}
              <iframe 
                src="https://app.relevanceai.com/agents/f1db6c/65646132e250-4c0b-aeb7-60c01a951ad0/eca1ec7e-1b6a-4549-966f-f3da8bdaa337/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="microphone"
                className="border-0"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Analytics & Insights */}
        {rightPanelOpen && (
          <div className="w-80 bg-white/70 backdrop-blur-sm border-l border-gray-200/50 p-4 space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Analytics & Insights</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setRightPanelOpen(false)}
              >
                <PanelRightClose className="w-4 h-4" />
              </Button>
            </div>

            {/* Argument Strength Meter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">Argument Strength</h5>
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <div className="space-y-2">
                  <Progress value={argumentStrength} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Current</span>
                    <span className="font-medium">{argumentStrength}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speaking Time Tracker */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">Speaking Time</h5>
                  <Timer className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {Math.floor(speakingTime / 60)}:{(speakingTime % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">
                  Target: 3:00 minutes
                </div>
              </CardContent>
            </Card>

            {/* Real-time Feedback */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">Live Feedback</h5>
                  <Activity className="w-4 h-4 text-orange-600" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Strong opening statement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Consider more evidence</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Good pace maintained</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Debate Score */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">Debate Score</h5>
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Logic & Reasoning</span>
                      <span>8.5/10</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Evidence Quality</span>
                      <span>7.2/10</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Delivery Style</span>
                      <span>9.1/10</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">AI Recommendations</h5>
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                    Try incorporating more statistical evidence to strengthen your argument.
                  </div>
                  <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-400">
                    Consider addressing potential counterarguments proactively.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-4 z-10">
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" size="sm" className="rounded-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            New Debate
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Save className="w-4 h-4 mr-2" />
            Save Session
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Volume2 className="w-4 h-4 mr-2" />
            Audio On
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentInterface;