"use client";

import { Button } from "@/components/ui/button";
import { Server, Settings, Terminal, Shield, Cpu, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function VPSSection() {
  return (
    <section id="vps" className="py-24 bg-deploy-dark text-white overflow-hidden relative">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-deploy-gradient opacity-10 blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <Badge className="bg-primary/20 text-primary border border-primary/30 mb-6">High Performance VPS</Badge>
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 leading-tight">
              Virtual Private Servers <br />
              <span className="text-primary">Built for Power Users</span>
            </h2>
            <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-xl">
              Take full control of your infrastructure with Hostxeon's enterprise-grade VPS. 
              Deploy instantly with pre-installed OS templates and full root access.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-5">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl h-fit shadow-inner">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Full Root Access</h4>
                  <p className="text-white/50 text-sm">Install any software, configure custom stacks, and manage your kernel exactly how you want.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl h-fit shadow-inner">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Enterprise Shield</h4>
                  <p className="text-white/50 text-sm">Real-time DDoS mitigation and isolated resources ensure your application stays online no matter what.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl h-14 px-10 text-lg">
                Explore VPS Plans
              </Button>
              <div className="text-white/50 text-sm flex items-center gap-2 px-4">
                Starting at <span className="text-white font-bold text-lg">$12.00</span> /mo
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-[32px] blur-2xl"></div>
            <div className="relative bg-[#0F172A] border border-white/10 rounded-3xl p-1 shadow-2xl">
              {/* Terminal Mockup */}
              <div className="bg-[#1E293B] rounded-[22px] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-black/20 border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono">
                      <Activity className="h-3 w-3" /> MONITORING ACTIVE
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-6 font-code text-sm">
                  <div className="flex gap-3">
                    <span className="text-primary font-bold">#</span>
                    <span className="text-white/90">hostxeon-cli status --vps-01</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">CPU Usage</div>
                      <div className="text-2xl font-bold text-white">12.4%</div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-primary h-full w-[12.4%]"></div>
                      </div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">Memory</div>
                      <div className="text-2xl font-bold text-white">2.1 GB</div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-primary h-full w-[25%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-green-400">Successfully connected to node-west-01...</p>
                    <p className="text-white/60">Uptime: 452 days, 14 hours</p>
                    <p className="text-white/60">Current Connections: 1,402</p>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="animate-pulse">_</span>
                    <span className="text-[10px] text-white/20">READY FOR COMMAND</span>
                  </div>
                </div>
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
    <span className={cn("px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full", className)}>
      {children}
    </span>
  );
}