"use client"

import { ArrowRight, Github, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/custom/Badge";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { useUser } from "@/context/UserContext";

export function Hero() {
  const { user, isLogged } = useUser();

  return (
    <SectionWrapper className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-20 lg:pb-40">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(var(--primary-rgb),0.1)_0%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[800px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="flex flex-col items-center text-center">
        <Badge
          variant="default"
          className="mb-8 animate-in fade-in slide-in-from-top-4 duration-1000"
        >
          <ShieldCheck className="mr-2 h-3 w-3" /> Production-Ready Auth System
        </Badge>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-8 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
          {isLogged
            ? `Welcome back, ${user?.username}!`
            : "Production-Ready Authentication for Modern Apps"}
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl mb-12 leading-relaxed">
          {isLogged
            ? "You are successfully logged into the Welfare Schemes Platform. Explore your personalized dashboard and available schemes."
            : "The complete toolkit for Google OAuth, traditional credentials, and passwordless authentication. Secure, scalable, and built for modern developers."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {isLogged ? (
            <Button
              size="lg"
              className="h-14 px-10 text-base font-bold rounded-2xl"
            >
              Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Link href="/login">
              <Button
                size="lg"
                className="h-14 px-10 text-base font-bold rounded-2xl shadow-lg shadow-primary/25"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
          <a
            href="https://github.com/ChaitanyaRankhamb/Walefare-Schemes-Platform"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-10 text-base font-bold rounded-2xl bg-background/50 backdrop-blur"
            >
              <Github className="mr-2 h-5 w-5" /> Explore on GitHub
            </Button>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
