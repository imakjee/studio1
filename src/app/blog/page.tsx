import { Metadata } from 'next';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Hostxeon Blog - Web Hosting Tips & Industry News',
  description: 'Stay updated with the latest in web hosting, server security, and website optimization from the Hostxeon expert team.',
};

const posts = [
  {
    id: 1,
    title: "Why NVMe Storage is a Game Changer for Your Website",
    excerpt: "Learn how the move from standard SSDs to NVMe technology can drastically reduce your website load times and improve SEO rankings.",
    date: "Oct 24, 2024",
    author: "Zeeshan Ahmed",
    image: "https://picsum.photos/seed/blog1/800/600",
    hint: "server hardware"
  },
  {
    id: 2,
    title: "Securing Your WordPress Site: 5 Essential Steps",
    excerpt: "WordPress is the most targeted CMS. We break down the top security measures you should take to keep your business safe.",
    date: "Oct 20, 2024",
    author: "Maria Khan",
    image: "https://picsum.photos/seed/blog2/800/600",
    hint: "security lock"
  },
  {
    id: 3,
    title: "The Future of Cloud Hosting in Pakistan",
    excerpt: "Infrastructure is evolving. Explore how local data centers and cloud scaling are transforming the digital landscape in Pakistan.",
    date: "Oct 15, 2024",
    author: "Arsalan Malik",
    image: "https://picsum.photos/seed/blog3/800/600",
    hint: "cloud computing"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <section className="pt-48 pb-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Badge className="bg-primary/10 text-primary border-none mb-6 font-bold uppercase tracking-widest text-[10px]">Company Blog</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-8 text-foreground">
            Latest from <span className="text-primary">Hostxeon</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert insights, technical tutorials, and the latest news from the world of high-performance hosting.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Card key={post.id} className="border-none shadow-xl rounded-[40px] overflow-hidden group hover:shadow-2xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={post.hint}
                />
              </div>
              <CardHeader className="p-8">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</div>
                  <div className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</div>
                </div>
                <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="ghost" className="p-0 font-bold text-primary hover:bg-transparent group/btn">
                  Read Full Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
