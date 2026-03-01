"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle, Globe, Layout, Palette, Code } from "lucide-react";
import { generateAiWebsiteConcept, AiWebsiteConceptGeneratorOutput } from "@/ai/flows/ai-website-concept-generator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function AiWebsiteTool() {
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiWebsiteConceptGeneratorOutput | null>(null);
  const [randomId, setRandomId] = useState<number | null>(null);

  // Use useEffect to generate random ID to avoid hydration mismatch errors
  useEffect(() => {
    setRandomId(Math.floor(Math.random() * 9000) + 1000);
  }, [result]);

  const handleGenerate = async () => {
    if (!businessType || !description) return;
    setLoading(true);
    try {
      const data = await generateAiWebsiteConcept({
        businessType,
        businessDescription: description
      });
      setResult(data);
    } catch (error) {
      console.error("Failed to generate concept", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F8FAFC] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-black font-black px-4 py-1.5 rounded-full mb-8 text-[10px] uppercase tracking-widest border border-accent/30">
              <Sparkles className="h-3 w-3" />
              AI WEBSITE BUILDER
            </div>
            <h2 className="text-foreground font-headline font-bold text-4xl md:text-6xl leading-tight mb-8">
              Build Your Dream <br />
              <span className="text-primary">Website With AI Magic</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed max-w-xl">
              Don't spend weeks designing. Describe your vision, and our AI assistant will generate a professional strategy and structure for your business instantly.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="flex gap-4">
                <div className="bg-primary/5 p-2 rounded-lg h-fit text-primary"><Layout className="h-5 w-5" /></div>
                <div>
                  <h4 className="font-bold text-sm mb-1">AI Structure</h4>
                  <p className="text-muted-foreground text-xs">Proprietary layout generation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/5 p-2 rounded-lg h-fit text-primary"><Palette className="h-5 w-5" /></div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Color Logic</h4>
                  <p className="text-muted-foreground text-xs">Smart color palette suggestions</p>
                </div>
              </div>
            </div>

            <Card className="border-none shadow-2xl bg-white p-2 rounded-[32px] overflow-hidden">
              <CardContent className="pt-8 space-y-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Business Type</label>
                  <Input 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="e.g., Artisan Bakery, SaaS Platform"
                    className="h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20 text-lg px-6"
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2 block">Describe your vision</label>
                  <Textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What makes your business special? Who are your customers?"
                    className="min-h-[120px] bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20 text-lg p-6"
                  />
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={loading || !businessType || !description}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6 mr-3" />
                      Build Roadmap
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="relative min-h-[600px] flex items-center justify-center">
            {/* Visual background */}
            <div className="absolute inset-0 bg-slate-100 rounded-[64px] border border-slate-200"></div>
            
            {!result && !loading && (
              <div className="relative z-10 text-center max-w-sm px-10">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-xl mx-auto mb-8 animate-float">
                  <Globe className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to Create?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form to see your AI-generated website concept and content strategy here.
                </p>
              </div>
            )}

            {loading && (
              <div className="relative z-10 text-center">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-primary animate-pulse" />
                </div>
                <p className="font-bold text-2xl">Crafting your brand...</p>
                <p className="text-muted-foreground mt-2">AI is analyzing your input</p>
              </div>
            )}

            {result && (
              <div className="relative z-10 w-full p-4 animate-in fade-in zoom-in-95 duration-700">
                <Card className="border-none shadow-2xl overflow-hidden rounded-[40px] bg-white">
                  <div className="h-3 bg-primary w-full"></div>
                  <CardHeader className="pt-10 px-10">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-primary/10 text-primary border-none font-bold">GENERATED CONCEPT</Badge>
                      <span className="text-xs text-muted-foreground font-mono">ID: AI-{randomId || '...' }</span>
                    </div>
                    <CardTitle className="text-3xl font-bold">Project: {businessType}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-10 px-10 pb-12">
                    <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
                      <h4 className="font-black text-xs uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Strategic Direction
                      </h4>
                      <p className="text-foreground text-xl leading-relaxed font-medium italic">
                        "{result.websiteConcept}"
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="font-black text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Structure Suggestions</h4>
                      <div className="grid gap-4">
                        {result.contentSuggestions.map((suggestion, idx) => (
                          <div key={idx} className="flex gap-4 items-center bg-slate-50 p-5 rounded-2xl transition-all hover:bg-slate-100 group">
                            <div className="bg-white h-10 w-10 rounded-xl flex items-center justify-center shadow-sm text-green-500 group-hover:scale-110 transition-transform">
                              <CheckCircle className="h-6 w-6" />
                            </div>
                            <p className="text-foreground font-bold">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[#0F172A] hover:bg-black text-white h-14 rounded-2xl font-bold text-lg">
                      Start Building This Site
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
