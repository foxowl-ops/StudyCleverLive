import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Newspaper, ArrowLeft } from "lucide-react";
import { fetchApi } from "@/lib/api";

const DomainPage = () => {
  const { domain } = useParams<{ domain: string }>();

  const { data: content, isLoading, isError } = useQuery({
    queryKey: ["content", domain],
    queryFn: () => fetchApi(`/api/domains/${domain}/content`),
    enabled: !!domain,
  });

  const { data: domainDetails } = useQuery({
    queryKey: ["domain", domain],
    queryFn: () => fetchApi(`/api/domains/${domain}`),
    enabled: !!domain,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !content || !domainDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Domain Not Found</h1>
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const articles = content.filter((item) => item.type === "article");
  const videos = content.filter((item) => item.type === "video");
  const news = content.filter((item) => item.type === "news");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl font-heading font-bold mb-4">{domainDetails.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{domainDetails.description}</p>
        </div>
      </header>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-12">
          
          {/* Articles Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-heading font-semibold">Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardHeader>
                    <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{article.description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Videos Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Play className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-heading font-semibold">Videos</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardHeader>
                    <h3 className="font-semibold text-lg leading-tight">{video.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{video.description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* News Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-heading font-semibold">Latest News</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((newsItem) => (
                <Card key={newsItem.id} className="hover:shadow-medium transition-shadow cursor-pointer">
                  <CardHeader>
                    <h3 className="font-semibold text-lg leading-tight">{newsItem.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{newsItem.description}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default DomainPage;nPage;