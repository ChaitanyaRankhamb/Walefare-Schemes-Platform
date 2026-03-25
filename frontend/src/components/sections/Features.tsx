import { Shield, Key, Lock, Zap, Server, Globe } from "lucide-react"
import { FeatureCard } from "@/components/ui/custom/FeatureCard"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

const features = [
  {
    title: "Google OAuth 2.0",
    description: "Seamless one-tap sign-in with Google, supporting Workspace and personal accounts with profile sync.",
    icon: Globe,
  },
  {
    title: "Email & Password",
    description: "Traditional credentials with Argon2 hashing, password strength validation, and account recovery flows.",
    icon: Lock,
  },
  {
    title: "Passwordless (OTP)",
    description: "Magic links and one-time passcodes delivered via email for a frictionless login experience.",
    icon: Zap,
  },
  {
    title: "JWT Authentication",
    description: "State-of-the-art token management with rotation, short-lived access tokens, and secure cookie storage.",
    icon: Key,
  },
  {
    title: "Redis Sessions",
    description: "High-performance session management and token blacklisting using Redis for lightning-fast lookups.",
    icon: Server,
  },
  {
    title: "Secure by Design",
    description: "CSRF protection, rate limiting, and security headers enabled by default to protect your users.",
    icon: Shield,
  },
]

export function Features() {
  return (
    <SectionWrapper id="features" className="bg-muted/30">
      <div className="mb-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Everything you need to secure your app.
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          A robust authentication layer that handles the complexity so you can focus on building your core features.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </SectionWrapper>
  )
}
