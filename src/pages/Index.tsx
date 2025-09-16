import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Newspaper, ArrowRight, Star, Users, Trophy, Zap } from "lucide-react";
import DynamicIcon from "@/components/ui/dynamic-icon";
import { Helmet } from "react-helmet-async";

// Helper function to determine text color based on background
const getTextColorForBackground = (hexColor) => {
  if (!hexColor || !hexColor.startsWith('#')) return 'text-white'; // Default for gradients or invalid format
  const rgb = parseInt(hexColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma < 140 ? 'text-white' : 'text-black';
};

const Index = () => {
  const domains = [
    {
      id: "ai",
      name: "Artificial Intelligence",
      description: "Master AI, machine learning, and the future of technology",
      icon: "Brain",
      color: "from-purple-500 to-blue-600",
      stats: { articles: 25, videos: 18, news: 12 }
    },
    {
      id: "finance",
      name: "Finance",
      description: "Build wealth with smart financial strategies and investments",
      icon: "TrendingUp",
      color: "from-green-500 to-emerald-600",
      stats: { articles: 32, videos: 24, news: 20 }
    },
    {
      id: "product-management",
      name: "Product Management",
      description: "Create products that users love and businesses need",
      icon: "Target",
      color: "from-orange-500 to-red-600",
      stats: { articles: 28, videos: 16, news: 15 }
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Expert Articles",
      description: "In-depth articles written by industry professionals"
    },
    {
      icon: Play,
      title: "Video Tutorials",
      description: "Learn with engaging video content and practical examples"
    },
    {
      icon: Newspaper,
      title: "Latest News",
      description: "Stay updated with the latest industry trends and news"
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Curated content from trusted sources and experts"
    }
  ];

  const stats = [
    { number: "1000+", label: "Students Learning" },
    { number: "85+", label: "Expert Articles" },
    { number: "58+", label: "Video Tutorials" },
    { number: "47+", label: "News Updates" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>StudyClever: Learn AI, Finance, and Product Management</title>
        <meta name="description" content="Master in-demand skills with StudyClever. Our platform offers expert-curated content, engaging videos, and the latest insights in Artificial Intelligence, Finance, and Product Management." />
      </Helmet>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
              StudyClever
            </h1>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/domain/ai" className="text-foreground/70 hover:text-foreground transition-colors">
                AI
              </Link>
              <Link to="/domain/finance" className="text-foreground/70 hover:text-foreground transition-colors">
                Finance
              </Link>
              <Link to="/domain/product-management" className="text-foreground/70 hover:text-foreground transition-colors">
                Product
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Zap className="h-3 w-3 mr-1" />
              New content added weekly
            </Badge>
            <h1 className="text-6xl md:text-7xl font-heading font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Learn Anything Smartly
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master AI, Finance, and Product Management with expert-curated content, 
              engaging videos, and the latest industry insights.
            </p>
            <div className="flex justify-center">
              <Link to="/domains">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dive deep into the most in-demand skills of today's digital economy. 
              Each domain offers comprehensive learning materials and real-world applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain) => {
              const isGradient = domain.color.startsWith('from-');
              const textColorClass = isGradient ? 'text-white' : getTextColorForBackground(domain.color);
              return (
                <Link key={domain.id} to={`/domain/${domain.id}`} className="group">
                  <Card className="h-full hover:shadow-strong transition-all duration-300 transform group-hover:-translate-y-2 border-0 bg-white">
                    <CardHeader className="pb-4">
                      <div 
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isGradient ? `bg-gradient-to-r ${domain.color}` : ''}`}
                        style={{ backgroundColor: isGradient ? undefined : domain.color }}
                      >
                        <DynamicIcon name={domain.icon} className={`h-8 w-8 ${textColorClass}`} />
                      </div>
                      <h3 className="text-2xl font-heading font-semibold group-hover:text-primary transition-colors">
                        {domain.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {domain.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {domain.stats.articles} Articles
                        </span>
                        <span className="flex items-center gap-1">
                          <Play className="h-4 w-4" />
                          {domain.stats.videos} Videos
                        </span>
                        <span className="flex items-center gap-1">
                          <Newspaper className="h-4 w-4" />
                          {domain.stats.news} News
                        </span>
                      </div>
                      <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                        Explore Domain
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Everything You Need to Learn
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive learning platform combines multiple content formats 
              to provide the best learning experience possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already building the skills for tomorrow. 
            Start your journey today.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
                StudyClever
              </h3>
              <p className="text-muted-foreground mt-2">
                Learn Anything Smartly
              </p>
            </div>
            <div className="flex gap-6 text-muted-foreground">
              <Link to="/domain/ai" className="hover:text-foreground transition-colors">
                AI Learning
              </Link>
              <Link to="/domain/finance" className="hover:text-foreground transition-colors">
                Finance
              </Link>
              <Link to="/domain/product-management" className="hover:text-foreground transition-colors">
                Product Management
              </Link>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 StudyClever. Crafted with passion for learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;