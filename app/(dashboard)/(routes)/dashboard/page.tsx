"use client"

import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { tools } from "@/constants";

export default function DashboardPage() {
  
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="font-bold text-2xl md:text-4xl text-center">Create with AI</h1>
        <p className="text-muted-foreground text-center text-sm md:text-lg">Explore the Power of AI by creating</p>
      </div>
      <div className="px-4 md:px-20 lg:px-48 space-y-4">
        {tools.map((tool) => (
          <Card key={tool.href}
          onClick={() => router.push(tool.href)}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md cursor-pointer transition ">
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </div>
  );
}
