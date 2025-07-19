import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, BookOpen, Mic } from "lucide-react";
import AuthScreen from "@/components/AuthScreen";
import DebateSetup from "@/components/DebateSetup";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'auth' | 'setup' | 'chat'>('home');

  const handleGetStarted = () => {
    setCurrentScreen('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('chat');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  if (currentScreen === 'auth') {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} onBack={handleBackToHome} />;
  }

  if (currentScreen === 'setup') {
    return <DebateSetup onBack={handleBackToHome} />;
  }

  if (currentScreen === 'chat') {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <iframe 
          src="https://app.relevanceai.com/agents/f1db6c/65646132e250-4c0b-aeb7-60c01a951ad0/eca1ec7e-1b6a-4549-966f-f3da8bdaa337/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false&hide_description=false" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="microphone"
          className="border-0"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"10\" cy=\"10\" r=\"1\"/%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
        
        {/* Header */}
        <header className="relative z-10 px-6 py-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">DebateMaster</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            </nav>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master the Art of
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Debate</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Practice with AI-powered mock debates. Choose your position, perfect your arguments, 
              and become a confident speaker in both Asian Parliamentary and British Parliamentary formats.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Practicing Now
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose DebateMaster?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Mock Debates",
                description: "Practice with realistic debate simulations",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: BookOpen,
                title: "Multiple Formats",
                description: "Asian Parliamentary & British Parliamentary",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Mic,
                title: "Choose Your Role",
                description: "Pick any of the 6 speaking positions",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Trophy,
                title: "Skill Building",
                description: "Improve your argumentation and delivery",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Debate Skills?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of debaters who have improved their skills with DebateMaster
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;