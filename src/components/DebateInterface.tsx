import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Play, Pause, RotateCcw, Users, Clock, MessageSquare, Volume2 } from "lucide-react";

interface DebateInterfaceProps {
  onBack: () => void;
  debateData: {
    type: string;
    side: string;
    topic: string;
  };
}

const DebateInterface = ({ onBack, debateData }: DebateInterfaceProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(420); // 7 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState(1);
  const [speechPhase, setSpeechPhase] = useState("Opening Government");

  const speakingOrder = [
    "Opening Government", "Opening Opposition", "Member Government", 
    "Member Opposition", "Closing Government", "Closing Opposition"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsTimerRunning(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsTimerRunning(false);
  };

  const handleNextSpeaker = () => {
    if (currentSpeaker < 6) {
      setCurrentSpeaker(prev => prev + 1);
      setSpeechPhase(speakingOrder[currentSpeaker]);
      setTimeRemaining(420);
      setIsTimerRunning(false);
      setSpeechText("");
    }
  };

  const handleReset = () => {
    setTimeRemaining(420);
    setIsTimerRunning(false);
    setIsRecording(false);
    setSpeechText("");
  };

  const progressPercentage = ((420 - timeRemaining) / 420) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')"
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 text-white hover:bg-white/10"
        >
          ← Back to Setup
        </Button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Live Debate Session</h1>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {debateData.type}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 text-white border-white/30">
              {debateData.side}
            </Badge>
          </div>
          <p className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            <strong>Topic:</strong> {debateData.topic}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer and Controls */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Speech Timer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className={`text-6xl font-mono font-bold mb-4 ${timeRemaining <= 60 ? 'text-red-400' : 'text-white'}`}>
                    {formatTime(timeRemaining)}
                  </div>
                  <Progress 
                    value={progressPercentage} 
                    className="mb-4"
                  />
                  <div className="flex justify-center gap-2">
                    {!isTimerRunning ? (
                      <Button 
                        onClick={() => setIsTimerRunning(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setIsTimerRunning(false)}
                        variant="destructive"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/10"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Speaking Order */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Speaking Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {speakingOrder.map((speaker, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border ${
                        index + 1 === currentSpeaker 
                          ? 'bg-blue-600/30 border-blue-400 text-blue-200' 
                          : index + 1 < currentSpeaker
                          ? 'bg-green-600/20 border-green-400/30 text-green-200'
                          : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{index + 1}. {speaker}</span>
                        {index + 1 === currentSpeaker && (
                          <Badge className="bg-blue-600">Current</Badge>
                        )}
                        {index + 1 < currentSpeaker && (
                          <Badge className="bg-green-600">Done</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Speech Area */}
          <div className="lg:col-span-2">
            {/* Voice Recording */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Mic className="w-5 h-5" />
                  Voice Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Button
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    size="lg"
                    className={`w-32 h-32 rounded-full text-white text-lg font-semibold transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                        : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-8 h-8 mb-2" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Mic className="w-8 h-8 mb-2" />
                        Record
                      </>
                    )}
                  </Button>
                  
                  {isRecording && (
                    <div className="mt-4">
                      <div className="flex justify-center items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 bg-red-500 animate-pulse rounded-full"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-red-400 mt-2 font-medium">Recording in progress...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Speech Transcript */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Speech Transcript
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  placeholder="Your speech will appear here as you speak... You can also type directly."
                  className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
                />
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                  <span>Words: {speechText.split(' ').filter(word => word.length > 0).length}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/10">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play Back
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
                disabled={currentSpeaker === 1}
              >
                Previous Speaker
              </Button>
              
              <Button
                onClick={handleNextSpeaker}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={currentSpeaker === 6}
              >
                {currentSpeaker === 6 ? 'Debate Complete' : 'Next Speaker →'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateInterface;