import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import DynamicIcon from "@/components/ui/dynamic-icon";

const fetchDomains = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/domains");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

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

const AllDomainsPage = () => {
  const { data: domains, isLoading, isError, error } = useQuery({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">All Domains</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-full bg-gray-200 animate-pulse">
              <CardHeader>
                <div className="w-16 h-16 rounded-2xl bg-gray-300 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
        <div className="container mx-auto px-6 py-10">
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error Fetching Domains</AlertTitle>
                <AlertDescription>
                    Could not fetch the domain data from the server. Please make sure the backend is running.
                    <pre className="mt-2 p-2 bg-gray-100 text-sm rounded">{error?.message}</pre>
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
        <div className="container mx-auto px-6 py-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                    Choose Your Learning Path
                </h1>
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
    </div>
  );
};

export default AllDomainsPage;
