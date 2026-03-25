import { Badge } from "@/components/ui/custom/Badge"
import { SectionWrapper } from "@/components/layout/SectionWrapper"

const techStack = [
  { name: "Next.js", color: "bg-black text-white" },
  { name: "Express.js", color: "bg-zinc-800 text-white" },
  { name: "MongoDB", color: "bg-emerald-600 text-white" },
  { name: "Redis", color: "bg-rose-600 text-white" },
  { name: "JWT", color: "bg-indigo-600 text-white" },
  { name: "Google OAuth", color: "bg-blue-600 text-white" },
  { name: "TypeScript", color: "bg-blue-700 text-white" },
  { name: "Tailwind CSS", color: "bg-sky-500 text-white" },
]

export function TechStack() {
  return (
    <SectionWrapper id="tech-stack" className="border-y">
      <div className="flex flex-col items-center gap-12 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Modern Auth Stack
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Built with the industry's most trusted tools to ensure reliability and performance.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={`rounded-2xl border px-8 py-6 text-lg font-bold shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${tech.color} border-transparent`}
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
