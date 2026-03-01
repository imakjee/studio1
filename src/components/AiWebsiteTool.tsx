
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Loader2, CheckCircle, Globe } from "lucide-react";
import { generateAiWebsiteConcept, AiWebsiteConceptGeneratorOutput } from "@/ai/flows/ai-website-concept-generator";

export function AiWebsiteTool() {
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiWebsiteConceptGeneratorOutput | null>(null);

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
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI POWERED</span>
            </div>
            <h2 className="text-foreground font-headline font-semibold text-3xl md:text-[40px] leading-tight mb-6">
              Not sure where to start? <br/>
              <span className="text-deploy-gradient bg-clip-text text-transparent bg-deploy-gradient">Let AI Build Your Roadmap</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Describe your business and our AI assistant will generate a tailored website concept and content strategy instantly. It's the perfect first step for your online journey.
            </p>
            
            <Card className="border-none shadow-xl">
              <CardContent className="pt-8 space-y-4">
                <div>
                  <label className="text-sm font-bold mb-1.5 block">What kind of business?</label>
                  <Input 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    placeholder="e.g., Artisan Bakery, SaaS Platform, Personal Trainer"
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold mb-1.5 block">Tell us a bit more</label>
                  <Textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What makes your business special? Who are your customers?"
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={loading || !businessType || !description}
                  className="w-full h-14 bg-deploy-gradient text-white text-lg font-medium rounded-lg"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Concept
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="relative min-h-[500px]">
            {!result && !loading && (
              <div className="absolute inset-0 border-2 border-dashed border-muted rounded-3xl flex flex-col items-center justify-center text-muted-foreground bg-white/50 backdrop-blur-sm">
                <Globe className="h-16 w-16 mb-4 opacity-20" />
                <p className="text-xl font-medium">Your concept will appear here</p>
                <p className="text-sm">Enter your details to get started</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-20">
                <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
                <p className="font-bold text-xl animate-pulse">Brainstorming your website...</p>
              </div>
            )}

            {result && (
              <Card className="border-none shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500 overflow-hidden">
                <div className="h-2 bg-deploy-gradient w-full"></div>
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">Concept for {businessType}</CardTitle>
                  <CardDescription className="text-md">AI-generated strategy roadmap</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold text-accent mb-2 uppercase tracking-tight flex items-center gap-2">
                      <Globe className="h-4 w-4" /> The Concept
                    </h4>
                    <p className="text-foreground leading-relaxed italic bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                      "{result.websiteConcept}"
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-deploy-gradient mb-3 uppercase tracking-tight">Content Suggestions</h4>
                    <div className="grid gap-3">
                      {result.contentSuggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-border/50">
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          <p className="text-sm md:text-base">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
