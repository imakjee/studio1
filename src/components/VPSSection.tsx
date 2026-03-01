"use client";

import { Button } from "@/components/ui/button";
import { Server, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function VPSSection() {
  return (
    <section id="vps" className="py-24 bg-deploy-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-deploy-gradient opacity-10 blur-[100px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="bg-accent mb-6">High Performance</Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">
              Powerful VPS for Serious Applications
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Experience complete control with our Virtual Private Servers. Full root access, dedicated resources, and instant deployment. Built for developers who need more power.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="flex gap-4">
                <div className="bg-white/10 p-3 rounded-lg h-fit">
                  <Server className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Root Access</h4>
                  <p className="text-white/60">Full SSH access to configure your environment exactly as needed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 p-3 rounded-lg h-fit">
                  <Settings className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Easy Dashboard</h4>
                  <p className="text-white/60">Manage multiple servers from a single, intuitive control panel.</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium rounded-lg h-14 px-10 text-lg">
              Explore VPS Plans
            </Button>
          </div>
          
          <div className="relative">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-white/30 text-sm font-code">deployhub-vps-server</span>
              </div>
              <div className="space-y-4 font-code text-sm sm:text-base">
                <p className="text-green-400">$ ssh deploy@vps-01.deployhub.io</p>
                <p className="text-white/80">Welcome to DeployHub VPS (Ubuntu 22.04 LTS)</p>
                <p className="text-white/80">$ uptime</p>
                <p className="text-green-400">up 452 days, 14:24, 0 users, load average: 0.04, 0.05, 0.00</p>
                <p className="text-white/80">$ deploy-cli status</p>
                <div className="bg-accent/20 p-4 rounded border border-accent/30 text-accent">
                  Checking server health... OK<br/>
                  Active instances: 12<br/>
                  CPU Usage: 14%<br/>
                  Memory: 2.4GB / 8GB
                </div>
                <p className="text-white/20 animate-pulse">_</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white rounded-full", className)}>
      {children}
    </span>
  );
}
